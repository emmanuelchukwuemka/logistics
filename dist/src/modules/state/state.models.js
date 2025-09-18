"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
const country_models_1 = __importDefault(require("../country/country.models"));
class State extends sequelize_1.Model {
}
State.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    country_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: country_models_1.default, key: "id" },
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
    modelName: "State",
    tableName: "states",
    timestamps: false,
    underscored: true,
});
// A State belongs to a Country
State.belongsTo(country_models_1.default, {
    foreignKey: "country_id",
    as: "country",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
// A Country has many States
country_models_1.default.hasMany(State, {
    foreignKey: "country_id",
    as: "states",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
exports.default = State;
