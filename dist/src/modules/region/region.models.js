"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
const continent_models_1 = __importDefault(require("../continent/continent.models"));
class Region extends sequelize_1.Model {
}
exports.Region = Region;
Region.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    continent_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    status: {
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "regions",
    modelName: "Region",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
Region.belongsTo(continent_models_1.default, {
    foreignKey: "continent_id",
    as: "continent",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
continent_models_1.default.hasMany(Region, {
    foreignKey: "continent_id",
    as: "regions",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
exports.default = Region;
