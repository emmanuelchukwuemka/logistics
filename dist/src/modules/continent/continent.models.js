"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continent = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
class Continent extends sequelize_1.Model {
}
exports.Continent = Continent;
Continent.init({
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
    status: {
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "continents",
    modelName: "Continent",
    timestamps: false,
});
exports.default = Continent;
