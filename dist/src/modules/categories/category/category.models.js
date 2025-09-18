"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
const maincategory_models_1 = require("../maincategory/maincategory.models");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    maincategory_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: maincategory_models_1.MainCategory, // Foreign key
            key: "id",
        },
    },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    label: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    image: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    status: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "category",
    modelName: "Category",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
Category.belongsTo(maincategory_models_1.MainCategory, {
    foreignKey: "maincategory_id",
    as: "maincategory",
});
// Associations
maincategory_models_1.MainCategory.hasMany(Category, {
    foreignKey: "maincategory_id",
    as: "categories",
});
exports.default = Category;
