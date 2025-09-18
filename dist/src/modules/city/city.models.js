"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
const state_models_1 = __importDefault(require("../state/state.models"));
class City extends sequelize_1.Model {
}
City.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    state_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: state_models_1.default, key: "id" },
    },
    status: { type: sequelize_1.DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: sequelize_2.default,
    modelName: "City",
    tableName: "cities",
    timestamps: false,
    underscored: true,
});
// Associations
City.belongsTo(state_models_1.default, {
    foreignKey: "state_id",
    as: "state",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
state_models_1.default.hasMany(City, {
    foreignKey: "state_id",
    as: "cities",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
exports.default = City;
