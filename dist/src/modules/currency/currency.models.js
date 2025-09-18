"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
class Currency extends sequelize_1.Model {
}
Currency.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.CHAR(3),
        allowNull: false,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    symbol: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    decimal_places: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 2,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: sequelize_2.default,
    modelName: "Currency",
    tableName: "currencies",
    timestamps: false,
    underscored: true,
});
exports.default = Currency;
