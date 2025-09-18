"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
const region_models_1 = __importDefault(require("../region/region.models"));
class Country extends sequelize_1.Model {
}
Country.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    iso2: {
        type: sequelize_1.DataTypes.STRING(2),
        allowNull: false,
        unique: true,
    },
    iso3: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        unique: true,
    },
    region_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: region_models_1.default,
            key: "id",
        },
    },
    currency_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    flag: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "countries",
    modelName: "Country",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
// Country belongs to Region
Country.belongsTo(region_models_1.default, {
    foreignKey: "region_id",
    as: "region",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
region_models_1.default.hasMany(Country, {
    foreignKey: "region_id",
    as: "countries",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
exports.default = Country;
