import z from "zod";
import Country from "../country/country.models";

export const getCountryById = async (id: number) => {
  return await Country.findByPk(id);
};

// Helper that allows either a single object or an array of objects
export const singleOrArray = <T extends z.ZodTypeAny>(schema: T) =>
  z.union([schema, z.array(schema)]);