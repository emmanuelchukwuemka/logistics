"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBannerController = void 0;
const banner_services_1 = require("./banner.services");
const banner_validations_1 = require("./banner.validations");
class AppBannerController {
    static async create(req, res) {
        try {
            const parsed = banner_validations_1.AppBannerSchema.parse(req.body);
            const banner = await banner_services_1.AppBannerService.createBanner(parsed);
            res.status(201).json(banner);
        }
        catch (error) {
            res.status(400).json({ error: error.errors ?? error.message });
        }
    }
    static async getAll(req, res) {
        const banners = await banner_services_1.AppBannerService.getAllBanners();
        res.json(banners);
    }
    static async getById(req, res) {
        const banner = await banner_services_1.AppBannerService.getBannerById(Number(req.params.id));
        if (!banner)
            return res.status(404).json({ message: "Banner not found" });
        res.json(banner);
    }
    static async update(req, res) {
        try {
            const parsed = banner_validations_1.AppBannerSchema.partial().parse(req.body);
            const banner = await banner_services_1.AppBannerService.updateBanner(Number(req.params.id), parsed);
            if (!banner)
                return res.status(404).json({ message: "Banner not found" });
            res.json(banner);
        }
        catch (error) {
            res.status(400).json({ error: error.errors ?? error.message });
        }
    }
    static async delete(req, res) {
        const success = await banner_services_1.AppBannerService.deleteBanner(Number(req.params.id));
        if (!success)
            return res.status(404).json({ message: "Banner not found" });
        res.json({ message: "Banner deleted successfully" });
    }
}
exports.AppBannerController = AppBannerController;
