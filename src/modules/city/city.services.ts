import State from "../state/state.models";
import { getStateById } from "./city.helpers";
import City, { CityAttributes, CityCreationAttributes } from "./city.models";
import { CityInput } from "./city.validations";

// export const createCity = async (
//   data: CityCreationAttributes | CityCreationAttributes[]
// ) => {
//   try {
//     const payload = Array.isArray(data) ? data : [data];

//     for (const city of payload) {
//       const state = await getStateById(city.state_id);
//       if (!state) throw new Error(`State not found with id=${city.state_id}`);

//       const exists = await City.findOne({
//         where: { name: city.name, state_id: city.state_id },
//       });
//       if (exists) throw new Error(`City already exists with name=${city.name}`);
//     }

//     const cities =
//       payload.length > 1
//         ? await City.bulkCreate(payload)
//         : [await City.create(payload[0])];

//     return {
//       success: true,
//       message:
//         payload.length > 1
//           ? `${cities.length} cities created successfully`
//           : "City created successfully",
//       data: payload.length > 1 ? cities : cities[0],
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.message || "Failed to create city",
//       error,
//     };
//   }
// };

export const createCity = async (
  data: CityCreationAttributes | CityCreationAttributes[]
) => {
  try {
    const payload = Array.isArray(data) ? data : [data];
    const citiesToInsert: CityCreationAttributes[] = [];

    for (const city of payload) {
      const state = await getStateById(city.state_id);
      if (!state) {
        throw new Error(`State not found with id=${city.state_id}`);
      }

      const exists = await City.findOne({
        where: { name: city.name, state_id: city.state_id },
      });

      if (!exists) {
        citiesToInsert.push(city);
      }
    }

    if (citiesToInsert.length === 0) {
      return {
        success: true,
        message: "No new cities to create (all duplicates skipped)",
        data: [],
      };
    }

    const cities =
      citiesToInsert.length > 1
        ? await City.bulkCreate(citiesToInsert)
        : [await City.create(citiesToInsert[0])];

    return {
      success: true,
      message:
        citiesToInsert.length > 1
          ? `${cities.length} cities created successfully`
          : "City created successfully",
      data: citiesToInsert.length > 1 ? cities : cities[0],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create city",
      error,
    };
  }
};

export const updateCity = async (id: number, data: Partial<CityAttributes>) => {
  try {
    const city = await City.findByPk(id);
    if (!city) return { success: false, message: "City not found" };

    await city.update(data);

    return { success: true, message: "City updated successfully", data: city };
  } catch (error: any) {
    return { success: false, message: "Failed to update city", error };
  }
};

export const getCityById = async (id: number) => {
  try {
    const city = await City.findByPk(id);
    if (!city) return { success: false, message: "City not found" };
    return { success: true, message: "City fetched successfully", data: city };
  } catch (error: any) {
    return { success: false, message: "Failed to fetch city", error };
  }
};

export const getCities = async () => {
  try {
    const cities = await City.findAll();
    return {
      success: true,
      message: "Cities fetched successfully",
      data: cities,
    };
  } catch (error: any) {
    return { success: false, message: "Failed to fetch cities", error };
  }
};

export const getCitiesByStateId = async (stateId: number) => {
  try {
    const data = await State.findByPk(stateId, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: City,
          as: "cities",
          attributes: { exclude: ["created_at", "updated_at"] },
        },
      ],
    });

    if (!data) {
      return { success: false, message: "State not found" };
    }

    return {
      success: true,
      data: data,
      message: "Cities fetched successfully",
    };
  } catch (error) {
    console.error("Fetch cities by state error:", error);
    return { success: false, message: "Failed to fetch cities" };
  }
};

export const deleteCity = async (id: number) => {
  try {
    const city = await City.findByPk(id);
    if (!city) return { success: false, message: "City not found" };

    await city.destroy();
    return { success: true, message: "City deleted successfully" };
  } catch (error: any) {
    return { success: false, message: "Failed to delete city", error };
  }
};
