import axios from "axios";
import sequelize from "../../config/database/sequelize";
import { Op } from "sequelize";
import { QueryTypes } from "sequelize";
import cron from "node-cron";
import ExchangeRate from "./forex.models";
import Currency from "../currency/currency.models";

interface CurrencyRow {
  id: number;
  code: string;
}

const API_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const PROVIDER = "v6.exchangerate";

export const fetchAndUpdateRates = async () => {
  const baseCode = "USD";

  try {
    //=> Fetch rates from API
    const { data } = await axios.get(
      `${API_URL}/${API_KEY}/latest/${baseCode}`
    );

    if (data.result !== "success") {
      return { success: false, message: "Failed to fetch rates" };
    }

    const rates: Record<string, number> = data.conversion_rates;

    //=> Start transaction
    const result = await sequelize.transaction(async (transaction) => {
      //=> Fetch all currencies once
      const currencies = await sequelize.query<CurrencyRow>(
        `SELECT id, code FROM currencies`,
        { type: QueryTypes.SELECT, transaction }
      );
      const currencyMap = new Map(currencies.map((c) => [c.code, c.id]));

      const baseId = currencyMap.get(baseCode);
      if (!baseId) throw new Error(`Base currency ${baseCode} not found`);

      // => Prepare bulk data
      const exchangeValues: any[] = [];
      const historyValues: any[] = [];

      for (const [targetCode, rate] of Object.entries(rates)) {
        //if (targetCode === baseCode) continue; am avoiding base to base

        const targetId = currencyMap.get(targetCode);
        if (!targetId) continue; // i dey skip unknown currencies

        // Insert/update exchange_rates (always)
        exchangeValues.push([baseId, targetId, rate, PROVIDER]);

        //=> Only insert into history if the rate changed
        const [latest] = await sequelize.query<{ rate: number }>(
          `SELECT rate 
           FROM exchange_rate_history 
           WHERE base_id = ? AND target_id = ? 
           ORDER BY effective_at DESC 
           LIMIT 1`,
          {
            replacements: [baseId, targetId],
            type: QueryTypes.SELECT,
            transaction,
          }
        );

        if (!latest || Number(latest.rate) !== Number(rate)) {
          historyValues.push([baseId, targetId, rate, PROVIDER]);
        }
      }

      //=> Bulk insert/update into exchange_rates
      if (exchangeValues.length > 0) {
        await sequelize.query(
          `
          INSERT INTO exchange_rates (base_id, target_id, rate, provider)
          VALUES ${exchangeValues.map(() => "(?, ?, ?, ?)").join(", ")}
          ON DUPLICATE KEY UPDATE
            rate = VALUES(rate),
            updated_at = CURRENT_TIMESTAMP
          `,
          { replacements: exchangeValues.flat(), transaction }
        );
      }

      //=> Bulk insert into history (only for changed rates)
      if (historyValues.length > 0) {
        await sequelize.query(
          `
          INSERT INTO exchange_rate_history 
          (base_id, target_id, rate, provider, effective_at)
          VALUES ${historyValues.map(() => "(?, ?, ?, ?, NOW())").join(", ")}
          `,
          { replacements: historyValues.flat(), transaction }
        );
      }

      return true;
    });

    return result
      ? { success: true, message: "Exchange rates updated successfully" }
      : { success: false, message: "Transaction failed" };
  } catch (err) {
    console.error("Service Error:", err);
    return { success: false, message: "Error updating exchange rates" };
  }
};

export const getExchangerates = async () => {
  try {
    const data = await ExchangeRate.findAll({
      attributes: ["id", "rate"],
      include: [
        {
          model: Currency,
          as: "base",
          attributes: ["code", "symbol"],
        },
        {
          model: Currency,
          as: "target",
          attributes: ["code", "symbol"],
        },
      ],
    });

    return {
      success: true,
      message: "Exchange rates fetched successfully",
      data,
    };
  } catch (error) {
    console.error("Fetch exchange rates error:", error);
    return { success: false, message: "Failed to fetch exchange rates", error };
  }
};

export const getExchangeRatesByCode = async (code: string) => {
  try {
    //Finding my currency code
    const currency = await Currency.findOne({ where: { code } });
    if (!currency) {
      return { success: false, message: `Currency ${code} not found` };
    }

    //Fetch exchange rates where currency is base or target
    const rates = await ExchangeRate.findAll({
      attributes: ["id", "rate"],
      where: {
        [Op.or]: [{ base_id: currency.id }, { target_id: currency.id }],
      },
      include: [
        { model: Currency, as: "base", attributes: ["code", "symbol"] },
        { model: Currency, as: "target", attributes: ["code", "symbol"] },
      ],
    });

    return {
      success: true,
      message: `Exchange rates for ${code} fetched successfully`,
      data: rates,
    };
  } catch (error) {
    console.error("Error fetching exchange rates by code:", error);
    return { success: false, message: "Failed to fetch exchange rates", error };
  }
};

//=> Schedule (ones a day)
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily exchange rate update job...");
  const result = await fetchAndUpdateRates();
  console.log(result);
});
