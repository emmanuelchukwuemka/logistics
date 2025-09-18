"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBanner = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
class AppBanner extends sequelize_1.Model {
}
exports.AppBanner = AppBanner;
AppBanner.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        defaultValue: "Bloomzon Banner",
    },
    keywords: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        defaultValue: "Shoes,oil,iphones,nike,wallet,bags",
    },
    image: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    enabled: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    numberOfProducts: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        defaultValue: "September 9, 2024 at 12:15:07 PM GMT+1",
    },
    creatorID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "appBanner",
    timestamps: false, // since you’re storing createdAt and updated_at manually
});
