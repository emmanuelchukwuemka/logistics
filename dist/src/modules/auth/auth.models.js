"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
class Auth extends sequelize_1.Model {
}
exports.Auth = Auth;
Auth.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    user_id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, {
    sequelize: sequelize_2.default,
    tableName: "auth_table",
    modelName: "Auth",
    timestamps: false,
});
exports.default = Auth;
