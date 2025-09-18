"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBannerService = void 0;
const banner_models_1 = require("./banner.models");
class AppBannerService {
    static async createBanner(data) {
        return banner_models_1.AppBanner.create(data);
    }
    static async getAllBanners() {
        return banner_models_1.AppBanner.findAll();
    }
    static async getBannerById(id) {
        return banner_models_1.AppBanner.findByPk(id);
    }
    static async updateBanner(id, data) {
        const banner = await banner_models_1.AppBanner.findByPk(id);
        if (!banner)
            return null;
        return banner.update(data);
    }
    static async deleteBanner(id) {
        const banner = await banner_models_1.AppBanner.findByPk(id);
        if (!banner)
            return null;
        await banner.destroy();
        return true;
    }
}
exports.AppBannerService = AppBannerService;
