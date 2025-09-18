"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRatesByCode = exports.getExchangerates = exports.fetchAndUpdateRates = void 0;
const axios_1 = __importDefault(require("axios"));
const sequelize_1 = __importDefault(require("../../config/database/sequelize"));
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
const node_cron_1 = __importDefault(require("node-cron"));
const forex_models_1 = __importDefault(require("./forex.models"));
const currency_models_1 = __importDefault(require("../currency/currency.models"));
const API_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const PROVIDER = "v6.exchangerate";
const fetchAndUpdateRates = async () => {
    const baseCode = "USD";
    try {
        //=> Fetch rates from API
        const { data } = await axios_1.default.get(`${API_URL}/${API_KEY}/latest/${baseCode}`);
        if (data.result !== "success") {
            return { success: false, message: "Failed to fetch rates" };
        }
        const rates = data.conversion_rates;
        //=> Start transaction
        const result = await sequelize_1.default.transaction(async (transaction) => {
            //=> Fetch all currencies once
            const currencies = await sequelize_1.default.query(`SELECT id, code FROM currencies`, { type: sequelize_3.QueryTypes.SELECT, transaction });
            const currencyMap = new Map(currencies.map((c) => [c.code, c.id]));
            const baseId = currencyMap.get(baseCode);
            if (!baseId)
                throw new Error(`Base currency ${baseCode} not found`);
            // => Prepare bulk data
            const exchangeValues = [];
            const historyValues = [];
            for (const [targetCode, rate] of Object.entries(rates)) {
                //if (targetCode === baseCode) continue; am avoiding base to base
                const targetId = currencyMap.get(targetCode);
                if (!targetId)
                    continue; // i dey skip unknown currencies
                // Insert/update exchange_rates (always)
                exchangeValues.push([baseId, targetId, rate, PROVIDER]);
                //=> Only insert into history if the rate changed
                const [latest] = await sequelize_1.default.query(`SELECT rate 
           FROM exchange_rate_history 
           WHERE base_id = ? AND target_id = ? 
           ORDER BY effective_at DESC 
           LIMIT 1`, {
                    replacements: [baseId, targetId],
                    type: sequelize_3.QueryTypes.SELECT,
                    transaction,
                });
                if (!latest || Number(latest.rate) !== Number(rate)) {
                    historyValues.push([baseId, targetId, rate, PROVIDER]);
                }
            }
            //=> Bulk insert/update into exchange_rates
            if (exchangeValues.length > 0) {
                await sequelize_1.default.query(`
          INSERT INTO exchange_rates (base_id, target_id, rate, provider)
          VALUES ${exchangeValues.map(() => "(?, ?, ?, ?)").join(", ")}
          ON DUPLICATE KEY UPDATE
            rate = VALUES(rate),
            updated_at = CURRENT_TIMESTAMP
          `, { replacements: exchangeValues.flat(), transaction });
            }
            //=> Bulk insert into history (only for changed rates)
            if (historyValues.length > 0) {
                await sequelize_1.default.query(`
          INSERT INTO exchange_rate_history 
          (base_id, target_id, rate, provider, effective_at)
          VALUES ${historyValues.map(() => "(?, ?, ?, ?, NOW())").join(", ")}
          `, { replacements: historyValues.flat(), transaction });
            }
            return true;
        });
        return result
            ? { success: true, message: "Exchange rates updated successfully" }
            : { success: false, message: "Transaction failed" };
    }
    catch (err) {
        console.error("Service Error:", err);
        return { success: false, message: "Error updating exchange rates" };
    }
};
exports.fetchAndUpdateRates = fetchAndUpdateRates;
const getExchangerates = async () => {
    try {
        const data = await forex_models_1.default.findAll({
            attributes: ["id", "rate"],
            include: [
                {
                    model: currency_models_1.default,
                    as: "base",
                    attributes: ["code", "symbol"],
                },
                {
                    model: currency_models_1.default,
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
    }
    catch (error) {
        console.error("Fetch exchange rates error:", error);
        return { success: false, message: "Failed to fetch exchange rates", error };
    }
};
exports.getExchangerates = getExchangerates;
const getExchangeRatesByCode = async (code) => {
    try {
        //Finding my currency code
        const currency = await currency_models_1.default.findOne({ where: { code } });
        if (!currency) {
            return { success: false, message: `Currency ${code} not found` };
        }
        //Fetch exchange rates where currency is base or target
        const rates = await forex_models_1.default.findAll({
            attributes: ["id", "rate"],
            where: {
                [sequelize_2.Op.or]: [{ base_id: currency.id }, { target_id: currency.id }],
            },
            include: [
                { model: currency_models_1.default, as: "base", attributes: ["code", "symbol"] },
                { model: currency_models_1.default, as: "target", attributes: ["code", "symbol"] },
            ],
        });
        return {
            success: true,
            message: `Exchange rates for ${code} fetched successfully`,
            data: rates,
        };
    }
    catch (error) {
        console.error("Error fetching exchange rates by code:", error);
        return { success: false, message: "Failed to fetch exchange rates", error };
    }
};
exports.getExchangeRatesByCode = getExchangeRatesByCode;
//=> Schedule (ones a day)
node_cron_1.default.schedule("0 0 * * *", async () => {
    console.log("Running daily exchange rate update job...");
    const result = await (0, exports.fetchAndUpdateRates)();
    console.log(result);
});
