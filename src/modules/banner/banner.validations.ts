import { z } from "zod";

export const AppBannerSchema = z.object({
  title: z.string().min(3).default("Bloomzon Banner"),
  keywords: z.string().default("Shoes,oil,iphones,nike,wallet,bags"),
  image: z.string().url("Image must be a valid URL"),
  enabled: z.string().min(4).max(5).default("FALSE"),
  numberOfProducts: z.number().int().min(0).default(0),
  createdAt: z.string(), // You might later replace with z.date()
  updated_at: z.string().optional(),
  creatorID: z.number().int(),
});

export type AppBannerInput = z.infer<typeof AppBannerSchema>;
