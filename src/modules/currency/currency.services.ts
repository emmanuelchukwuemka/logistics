import sequelize from "../../config/database/sequelize";
import { fetchAndUpdateRates } from "../forex/forex.services";
import Currency, {
  CurrencyAttributes,
  CurrencyCreationAttributes,
} from "./currency.models";

// export const createCurrency = async (
//   data: CurrencyCreationAttributes | CurrencyCreationAttributes[]
// ) => {
//   try {
//     const payload = Array.isArray(data) ? data : [data];

//     // Check duplicates before inserting
//     for (const item of payload) {
//       const existing = await Currency.findOne({ where: { code: item.code } });
//       if (existing) {
//         return {
//           success: false,
//           message: `Currency with code '${item.code}' already exists`,
//         };
//       }
//     }

//     const currencies =
//       payload.length > 1
//         ? await Currency.bulkCreate(payload)
//         : [await Currency.create(payload[0])];

//     return {
//       success: true,
//       message:
//         payload.length > 1
//           ? `${currencies.length} currencies created successfully`
//           : "Currency created successfully",
//       data: payload.length > 1 ? currencies : currencies[0],
//     };
//   } catch (error) {
//     console.error("Create currency error:", error);
//     return { success: false, message: "Failed to create currency", error };
//   }
// };

export const createCurrency = async (
  data: CurrencyCreationAttributes | CurrencyCreationAttributes[]
) => {
  try {
    const payload = Array.isArray(data) ? data : [data];

    // Check duplicates in one query
    const codes = payload.map((item) => item.code);
    const existing = await Currency.findAll({ where: { code: codes } });

    if (existing.length > 0) {
      return {
        success: false,
        message: `Currencies already exist: ${existing.map((c) => c.code).join(", ")}`,
      };
    }

    // Use transaction for safety
    const currencies = await sequelize.transaction(async (t) => {
      return await Currency.bulkCreate(payload, { transaction: t });
    });

    // Fetch and update exchange rates after creation
    const rateResult = await fetchAndUpdateRates();

    return {
      success: true,
      message:
        currencies.length > 1
          ? `${currencies.length} currencies created successfully and exchange rates updated`
          : "Currency created successfully and exchange rates updated",
      data: currencies.length > 1 ? currencies : currencies[0],
      ratesUpdate: rateResult,
    };
  } catch (error) {
    console.error("Create currency error:", error);
    return { success: false, message: "Failed to create currency", error };
  }
};

export const getCurrencies = async () => {
  try {
    const currencies = await Currency.findAll();
    return {
      success: true,
      message: "Currencies fetched successfully",
      data: currencies,
    };
  } catch (error) {
    console.error("Fetch currencies error:", error);
    return { success: false, message: "Failed to fetch currencies", error };
  }
};

export const getCurrencyById = async (id: number) => {
  try {
    const currency = await Currency.findByPk(id);
    if (!currency) return { success: false, message: "Currency not found" };
    return {
      success: true,
      message: "Currency fetched successfully",
      data: currency,
    };
  } catch (error) {
    console.error("Fetch currency by id error:", error);
    return { success: false, message: "Failed to fetch currency", error };
  }
};

export const getCurrencyByCode = async (code: string) => {
  try {
    const currency = await Currency.findOne({
      where: { code: code.toUpperCase() },
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    if (!currency) {
      return {
        success: false,
        message: `Currency with code '${code}' not found`,
      };
    }

    return {
      success: true,
      message: "Currency fetched successfully",
      data: currency,
    };
  } catch (error) {
    console.error("Get currency by code error:", error);
    return {
      success: false,
      message: "Failed to fetch currency",
      error,
    };
  }
};

export const updateCurrency = async (
  id: number,
  data: Partial<CurrencyAttributes>
) => {
  try {
    const currency = await Currency.findByPk(id);
    if (!currency) return { success: false, message: "Currency not found" };

    // If updating code, check for conflicts
    if (data.code && data.code !== currency.code) {
      const existing = await Currency.findOne({ where: { code: data.code } });
      if (existing) {
        return {
          success: false,
          message: `Currency with code '${data.code}' already exists`,
        };
      }
    }

    await currency.update(data);
    return {
      success: true,
      message: "Currency updated successfully",
      data: currency,
    };
  } catch (error) {
    console.error("Update currency error:", error);
    return { success: false, message: "Failed to update currency", error };
  }
};

export const deleteCurrency = async (id: number) => {
  try {
    const currency = await Currency.findByPk(id);
    if (!currency) return { success: false, message: "Currency not found" };
    await currency.destroy();
    return { success: true, message: "Currency deleted successfully" };
  } catch (error) {
    console.error("Delete currency error:", error);
    return { success: false, message: "Failed to delete currency", error };
  }
};
