import { ServiceCategory, ServiceType } from "./logistics.models";

export const seedServiceData = async () => {
  try {
    console.log("Seeding service categories and types...");

    // Seed Service Categories
    const categories = [
      { name: "Domestic", description: "Services within the same country", isActive: true },
      { name: "International", description: "Services across international borders", isActive: true },
      { name: "Express", description: "Fast delivery services", isActive: true },
      { name: "Standard", description: "Regular delivery services", isActive: true },
    ];

    const createdCategories = [];
    for (const category of categories) {
      const [cat, created] = await ServiceCategory.findOrCreate({
        where: { name: category.name },
        defaults: category,
      });
      createdCategories.push(cat);
      if (created) {
        console.log(`Created category: ${category.name}`);
      }
    }

    // Seed Service Types
    const serviceTypes = [
      // Domestic
      { name: "Local Courier", categoryId: createdCategories[0].id, description: "Local same-day delivery", isActive: true },
      { name: "Domestic Ground", categoryId: createdCategories[0].id, description: "Ground transportation within country", isActive: true },
      { name: "Domestic Air", categoryId: createdCategories[0].id, description: "Domestic air freight", isActive: true },

      // International
      { name: "International Air Freight", categoryId: createdCategories[1].id, description: "International air cargo services", isActive: true },
      { name: "International Sea Freight", categoryId: createdCategories[1].id, description: "International sea cargo services", isActive: true },
      { name: "International Express", categoryId: createdCategories[1].id, description: "International express delivery", isActive: true },

      // Express
      { name: "Same Day Delivery", categoryId: createdCategories[2].id, description: "Same day pickup and delivery", isActive: true },
      { name: "Next Day Delivery", categoryId: createdCategories[2].id, description: "Next business day delivery", isActive: true },
      { name: "Express Courier", categoryId: createdCategories[2].id, description: "Priority express services", isActive: true },

      // Standard
      { name: "Standard Ground", categoryId: createdCategories[3].id, description: "Standard ground delivery", isActive: true },
      { name: "Economy Shipping", categoryId: createdCategories[3].id, description: "Cost-effective shipping", isActive: true },
      { name: "Bulk Shipping", categoryId: createdCategories[3].id, description: "Bulk cargo transportation", isActive: true },
    ];

    for (const serviceType of serviceTypes) {
      const [type, created] = await ServiceType.findOrCreate({
        where: { name: serviceType.name },
        defaults: serviceType,
      });
      if (created) {
        console.log(`Created service type: ${serviceType.name}`);
      }
    }

    console.log("Service data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding service data:", error);
  }
};
