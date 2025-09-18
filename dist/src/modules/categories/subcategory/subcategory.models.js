"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subcategory = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
const category_models_1 = __importDefault(require("../category/category.models"));
class Subcategory extends sequelize_1.Model {
}
exports.Subcategory = Subcategory;
Subcategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: category_models_1.default, // Foreign key
            key: "id",
        },
        onDelete: "CASCADE",
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    label: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "subcategory",
    timestamps: false,
    underscored: true,
});
// Association: Subcategory belongs to Category
Subcategory.belongsTo(category_models_1.default, {
    foreignKey: "category_id",
    as: "category",
});
// A Category can have many Subcategories
category_models_1.default.hasMany(Subcategory, {
    foreignKey: "category_id",
    as: "subcategories",
});
