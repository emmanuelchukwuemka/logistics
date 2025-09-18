import Continent, { ContinentCreationAttributes } from "./continent.models";
import {
  ContinentInput,
  ContinentFlexibleInput,
} from "./continent.validations";

export const createContinent = async (data: ContinentFlexibleInput) => {
  try {
    const continents = Array.isArray(data) ? data : [data];

    const inserted: Continent[] = [];

    for (const c of continents) {
      // Skip if exists
      const exists = await Continent.findOne({ where: { name: c.name } });
      if (exists) continue;

      const newContinent = await Continent.create(
        c as ContinentCreationAttributes
      );
      inserted.push(newContinent);
    }

    return {
      success: true,
      message: inserted.length
        ? "Continents created successfully"
        : "No new continents to add",
      data: inserted.map((c) => ({ id: c.id, name: c.name })),
    };
  } catch (error) {
    console.error("Continent creation error:", error);
    return { success: false, message: "Failed to create continents" };
  }
};

export const getContinents = async () => {
  try {
    const data = await Continent.findAll({ where: { status: 1 } });
    return { success: true, data };
  } catch (error) {
    console.error("Fetch continents error:", error);
    return { success: false, message: "Failed to fetch continents" };
  }
};

export const getContinentById = async (id: number) => {
  try {
    const continent = await Continent.findByPk(id);

    if (!continent) {
      return { success: false, message: "Continent not found" };
    }

    return { success: true, data: continent };
  } catch (error) {
    console.error("Get continent by ID error:", error);
    return { success: false, message: "Failed to fetch continent" };
  }
};

export const updateContinent = async (
  id: number,
  data: Partial<ContinentInput>
) => {
  try {
    const continent = await Continent.findByPk(id);
    if (!continent) return { success: false, message: "Continent not found" };

    const updateData = Array.isArray(data) ? data[0] : data;

    await continent.update(updateData);

    console.log("Updated continent:", continent.toJSON());

    return {
      success: true,
      message: "Continent updated successfully",
      data: continent,
    };
  } catch (error) {
    console.error("Update continent error:", error);
    return {
      success: false,
      message: "Failed to update continent",
    };
  }
};

export const deleteContinent = async (id: number) => {
  try {
    const continent = await Continent.findByPk(id);
    if (!continent) return { success: false, message: "Continent not found" };

    await continent.destroy();
    return { success: true, message: "Continent deleted successfully" };
  } catch (error) {
    console.error("Delete continent error:", error);
    return { success: false, message: "Failed to delete continent" };
  }
};
