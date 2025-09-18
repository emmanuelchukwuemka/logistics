import z from "zod";
import State from "../state/state.models";

export const getStateById = async (id: number) => {
  return await State.findByPk(id);
};

// Helper that allows either a single object or an array of objects
export const singleOrArray = <T extends z.ZodTypeAny>(schema: T) =>
  z.union([schema, z.array(schema)]);
