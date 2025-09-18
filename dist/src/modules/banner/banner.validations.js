"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBannerSchema = void 0;
const zod_1 = require("zod");
exports.AppBannerSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).default("Bloomzon Banner"),
    keywords: zod_1.z.string().default("Shoes,oil,iphones,nike,wallet,bags"),
    image: zod_1.z.string().url("Image must be a valid URL"),
    enabled: zod_1.z.string().min(4).max(5).default("FALSE"),
    numberOfProducts: zod_1.z.number().int().min(0).default(0),
    createdAt: zod_1.z.string(), // You might later replace with z.date()
    updated_at: zod_1.z.string().optional(),
    creatorID: zod_1.z.number().int(),
});
