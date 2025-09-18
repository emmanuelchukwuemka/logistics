import Country from "../country/country.models";
import { getCountryById } from "./state.helpers";
import State, { StateAttributes, StateCreationAttributes } from "./state.models";
import { StateInput, StateUpdateInput } from "./state.validations";

export const createState = async (
  data: StateCreationAttributes | StateCreationAttributes[]
) => {
  try {
    const payload = Array.isArray(data) ? data : [data];

    for (const state of payload) {
      // Check if country exists
      const country = await getCountryById(state.country_id);
      if (!country) {
        return {
          success: false,
          message: `Country with id=${state.country_id} does not exist.`,
        };
      }

      // Check if state already exists (by name or code in same country)
      const existingState = await State.findOne({
        where: {
          country_id: state.country_id,
          name: state.name,
        },
      });

      if (existingState) {
        return {
          success: false,
          message: `State "${state.name}" already exists in country ${country.name}.`,
        };
      }
    }

    //Insert states
    const states =
      payload.length > 1
        ? await State.bulkCreate(payload)
        : [await State.create(payload[0])];

    return {
      success: true,
      message:
        payload.length > 1
          ? `${states.length} states created successfully`
          : "State created successfully",
      data: payload.length > 1 ? states : states[0],
    };
  } catch (error) {
    console.error("Create state error:", error);
    return { success: false, message: "Failed to create state", error };
  }
};

export const updateState = async (
  id: number,
  data: Partial<StateAttributes> | Partial<StateAttributes>[]
) => {
  try {
    const state = await State.findByPk(id);
    if (!state) {
      return { success: false, message: "State not found" };
    }

    // Flatten array if data comes as [ { ... } ]
    const updateData = Array.isArray(data) ? data[0] : data;

    if (!updateData || Object.keys(updateData).length === 0) {
      return { success: false, message: "No fields provided to update" };
    }

    await state.update(updateData);

    return {
      success: true,
      message: "State updated successfully",
      data: state,
    };
  } catch (error) {
    console.error("Update state error:", error);
    return {
      success: false,
      message: "Failed to update state",
      error,
    };
  }
};

export const deleteState = async (id: number) => {
  try {
    const state = await State.findByPk(id);

    if (!state) {
      return { success: false, message: "State not found" };
    }

    await state.destroy();

    return { success: true, message: "State deleted successfully" };
  } catch (error) {
    console.error("Delete state error:", error);
    return { success: false, message: "Failed to delete state", error };
  }
};

export const getStates = async () => {
  try {
    const states = await State.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    return {
      success: true,
      message: "States fetched successfully",
      data: states,
    };
  } catch (error) {
    console.error("Fetch states error:", error);
    return { success: false, message: "Failed to fetch states", error };
  }
};

export const getStateById = async (id: number) => {
  try {
    const state = await State.findByPk(id, {
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    if (!state) return { success: false, message: "State not found" };

    return {
      success: true,
      message: "State fetched successfully",
      data: state,
    };
  } catch (error) {
    console.error("Fetch state by id error:", error);
    return { success: false, message: "Failed to fetch state", error };
  }
};

export const getStatesByCountry = async (country_id: number) => {
  try {

    const data = await Country.findByPk(country_id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: State,
          as: "states",
          attributes: { exclude: ["created_at", "updated_at"] },
        },
      ],
    });

    if (!data) {
      return { success: false, message: "Counrty not found" };
    }

    return {
      success: true,
      message: "States fetched successfully",
      data: data,
    };
  } catch (error) {
    console.error("Fetch states by country error:", error);
    return { success: false, message: "Failed to fetch states", error };
  }
};
