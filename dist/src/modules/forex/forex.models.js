"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
const currency_models_1 = __importDefault(require("../currency/currency.models"));
class ExchangeRate extends sequelize_1.Model {
}
exports.ExchangeRate = ExchangeRate;
ExchangeRate.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    base_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    target_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    rate: {
        type: sequelize_1.DataTypes.DECIMAL(18, 6),
        allowNull: false,
    },
    provider: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
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
    tableName: "exchange_rates",
    modelName: "ExchangeRate",
    timestamps: false,
    indexes: [
        { fields: ["base_id"] },
        { fields: ["target_id"] },
        {
            unique: true,
            fields: ["base_id", "target_id"],
        },
    ],
});
ExchangeRate.belongsTo(currency_models_1.default, {
    as: "base",
    foreignKey: "base_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
ExchangeRate.belongsTo(currency_models_1.default, {
    as: "target",
    foreignKey: "target_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
exports.default = ExchangeRate;
