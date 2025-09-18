import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";

// Attributes for Auth model
export interface AuthAttributes {
  id: number;
  email: string;
  password: string;
  user_id: number;
}

// Input type for creation (id is optional because DB auto-generates it)
export interface AuthCreationAttributes
  extends Optional<AuthAttributes, "id"> {}

export class Auth
  extends Model<AuthAttributes, AuthCreationAttributes>
  implements AuthAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public user_id!: number;
}

Auth.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(255), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  {
    sequelize,
    tableName: "auth_table",
    modelName: "Auth",
    timestamps: false,
  }
);

export default Auth;
