import sequelize from "../config/database/sequelize"; // Sequelize ORM connection
import pool from "../config/database/db"; // MySQL2 raw connection

// Import logistics models to ensure they are registered with Sequelize
import "../modules/logistics/logistics.models";
import { seedServiceData } from "../modules/logistics/logistics.seed";

export default async function checkDatabaseConnections() {
  try {
    // Test Sequelize ORM connection
    await sequelize.authenticate();
    console.log("ORM DB connected");

    // Synchronize only logistics models with database (create tables if they don't exist)
    // Use force: false to avoid dropping existing tables
    await sequelize.sync({ force: false, alter: false });
    console.log("Database synchronized successfully");

    // Seed initial data
    await seedServiceData();

    // Test raw MySQL2 connection
    const connection = await pool.getConnection();
    try {
      console.log("Raw SQL DB connected");
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1); // Here am exiting the app if DB is not reachable
  }
}
