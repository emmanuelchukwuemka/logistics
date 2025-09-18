"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCategory = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class MainCategory extends sequelize_1.Model {
}
exports.MainCategory = MainCategory;
MainCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    label: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    image: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    status: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "maincategory",
    modelName: "MainCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = MainCategory;
