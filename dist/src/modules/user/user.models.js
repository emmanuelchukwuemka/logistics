"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
// Sequelize model class
class User extends sequelize_1.Model {
}
exports.User = User;
// Defining table + columns
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    first_name: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    last_name: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    email: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    phone: { type: sequelize_1.DataTypes.STRING(20), allowNull: true },
    city_id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: true },
    picture: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    is_verified: { type: sequelize_1.DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "users_table",
    modelName: "User",
    timestamps: false,
});
exports.default = User;
