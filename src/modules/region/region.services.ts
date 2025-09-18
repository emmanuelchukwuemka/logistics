import Continent from "../continent/continent.models";
import Region from "./region.models";
import { RegionInput } from "./region.validations";

// Fetch all regions
export const getRegions = async () => {
  try {
    const data = await Region.findAll({ where: { status: 1 } });
    return { success: true, data };
  } catch (error) {
    console.error("Fetch regions error:", error);
    return { success: false, message: "Failed to fetch regions" };
  }
};

// Fetch region by ID
export const getRegionById = async (id: number) => {
  try {
    const region = await Region.findByPk(id);
    if (!region) return { success: false, message: "Region not found" };
    return { success: true, data: region };
  } catch (error) {
    console.error("Get region by ID error:", error);
    return { success: false, message: "Failed to fetch region" };
  }
};

// Fetch region by continent
export const getRegionsByContinentId = async (continent_id: number) => {
  try {
    const data = await Continent.findByPk(continent_id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: Region,
          as: "regions",
          attributes: { exclude: ["created_at", "updated_at"] },
        },
      ],
    });

    if (!data) {
      return { success: false, message: "Region not found" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("Get regions by continent error:", error);
    return { success: false, message: "Failed to fetch regions" };
  }
};

// Create region(s)
export const createRegion = async (data: RegionInput | RegionInput[]) => {
  try {
    const inputArray = Array.isArray(data) ? data : [data];
    const inserted = await Region.bulkCreate(inputArray);
    return {
      success: true,
      message: "Regions created successfully",
      data: inserted,
    };
  } catch (error) {
    console.error("Create region error:", error);
    return { success: false, message: "Failed to create region" };
  }
};

// Update region
export const updateRegion = async (id: number, data: Partial<RegionInput>) => {
  try {
    const region = await Region.findByPk(id);
    if (!region) return { success: false, message: "Region not found" };
    await region.update(data);
    return {
      success: true,
      message: "Region updated successfully",
      data: region,
    };
  } catch (error) {
    console.error("Update region error:", error);
    return { success: false, message: "Failed to update region" };
  }
};

// Delete region
export const deleteRegion = async (id: number) => {
  try {
    const region = await Region.findByPk(id);
    if (!region) {
      return { success: false, message: "Region not found" };
    }

    await region.destroy();
    return { success: true, message: "Region deleted successfully" };
  } catch (error) {
    console.error("Delete region error:", error);
    return { success: false, message: "Failed to delete region" };
  }
};
