import { AppBanner } from "./banner.models";
import { AppBannerInput } from "./banner.validations";

export class AppBannerService {
  static async createBanner(data: AppBannerInput) {
    return AppBanner.create(data);
  }

  static async getAllBanners() {
    return AppBanner.findAll();
  }

  static async getBannerById(id: number) {
    return AppBanner.findByPk(id);
  }

  static async updateBanner(id: number, data: Partial<AppBannerInput>) {
    const banner = await AppBanner.findByPk(id);
    if (!banner) return null;
    return banner.update(data);
  }

  static async deleteBanner(id: number) {
    const banner = await AppBanner.findByPk(id);
    if (!banner) return null;
    await banner.destroy();
    return true;
  }
}
