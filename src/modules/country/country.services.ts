import { CountryInput } from "./country.validations";

import Country, {
  CountryAttributes,
  CountryCreationAttributes,
} from "./country.models";
import { findCountryByIso } from "./country.helpers";
import Region from "../region/region.models";

export const createCountry = async (
  data: CountryCreationAttributes | CountryCreationAttributes[]
) => {
  try {
    const payload = Array.isArray(data) ? data : [data];

    const createdCountries: Country[] = [];
    const skippedCountries: CountryCreationAttributes[] = [];

    for (const country of payload) {
      const exists = await findCountryByIso(country.iso2, country.iso3);
      if (exists) {
        console.warn(`Skipping duplicate: ${country.iso2}/${country.iso3}`);
        skippedCountries.push(country);
        continue; // skip duplicates
      }

      const newCountry = await Country.create(country);
      createdCountries.push(newCountry);
    }

    if (createdCountries.length === 0) {
      return {
        success: false,
        message: "No new countries created (all duplicates skipped)",
        data: [],
      };
    }

    return {
      success: true,
      message:
        createdCountries.length > 1
          ? `${createdCountries.length} countries created successfully`
          : "Country created successfully",
      data:
        createdCountries.length > 1 ? createdCountries : createdCountries[0],
      skipped: skippedCountries.length > 0 ? skippedCountries : undefined,
    };
  } catch (error) {
    console.error("Create country error:", error);
    return {
      success: false,
      message: "Failed to create country",
      error,
    };
  }
};

export const getCountries = async () => {
  try {
    const countries = await Country.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    return {
      success: true,
      message: "Countries fetched successfully",
      data: countries,
    };
  } catch (error) {
    console.error("Fetch countries error:", error);
    return {
      success: false,
      message: "Failed to fetch countries",
      error,
    };
  }
};

export const getCountryById = async (id: number) => {
  try {
    const country = await Country.findByPk(id, {
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    if (!country) {
      return {
        success: false,
        message: "Country not found",
      };
    }

    return {
      success: true,
      message: "Country fetched successfully",
      data: country,
    };
  } catch (error) {
    console.error("Fetch country by id error:", error);
    return {
      success: false,
      message: "Failed to fetch country",
      error,
    };
  }
};

export const getCountriesByRegion = async (regionId: number) => {
  try {
    const data = await Region.findByPk(regionId, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: Country,
          as: "countries",
          attributes: { exclude: ["created_at", "updated_at"] },
        },
      ],
    });

    if (!data) {
      return { success: false, message: "Region not found" };
    }

    return {
      success: true,
      message: "Countries fetched successfully",
      data: data,
    };
  } catch (error) {
    console.error("Fetch countries by region error:", error);
    return {
      success: false,
      message: "Failed to fetch countries by region",
      error,
    };
  }
};

export const updateCountry = async (
  id: number,
  data: Partial<CountryAttributes>
) => {
  try {
    const country = await Country.findByPk(id);
    if (!country) {
      return { success: false, message: "Country not found" };
    }

    // If iso2 or iso3 is being updated, check duplicates
    if (data.iso2 || data.iso3) {
      const iso2 = data.iso2 ?? country.iso2;
      const iso3 = data.iso3 ?? country.iso3;

      const exists = await findCountryByIso(iso2, iso3);

      if (exists && exists.id !== id) {
        return {
          success: false,
          message: `Another country already exists with iso2=${iso2}, iso3=${iso3}`,
        };
      }
    }

    await country.update(data);

    return {
      success: true,
      message: "Country updated successfully",
      data: country,
    };
  } catch (error) {
    console.error("Update country error:", error);
    return {
      success: false,
      message: "Failed to update country",
      error,
    };
  }
};

export const deleteCountry = async (id: number) => {
  try {
    const country = await Country.findByPk(id);
    if (!country) return { success: false, message: "Country not found" };

    await country.destroy();
    return { success: true, message: "Country deleted" };
  } catch (error) {
    console.error("Delete country error:", error);
    return { success: false, message: "Failed to delete country" };
  }
};
