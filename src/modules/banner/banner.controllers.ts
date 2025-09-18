import { Request, Response } from "express";
import { AppBannerService } from "./banner.services";
import { AppBannerSchema } from "./banner.validations";

export class AppBannerController {
  static async create(req: Request, res: Response) {
    try {
      const parsed = AppBannerSchema.parse(req.body);
      const banner = await AppBannerService.createBanner(parsed);
      res.status(201).json(banner);
    } catch (error: any) {
      res.status(400).json({ error: error.errors ?? error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const banners = await AppBannerService.getAllBanners();
    res.json(banners);
  }

  static async getById(req: Request, res: Response) {
    const banner = await AppBannerService.getBannerById(Number(req.params.id));
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json(banner);
  }

  static async update(req: Request, res: Response) {
    try {
      const parsed = AppBannerSchema.partial().parse(req.body);
      const banner = await AppBannerService.updateBanner(Number(req.params.id), parsed);
      if (!banner) return res.status(404).json({ message: "Banner not found" });
      res.json(banner);
    } catch (error: any) {
      res.status(400).json({ error: error.errors ?? error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const success = await AppBannerService.deleteBanner(Number(req.params.id));
    if (!success) return res.status(404).json({ message: "Banner not found" });
    res.json({ message: "Banner deleted successfully" });
  }
}
