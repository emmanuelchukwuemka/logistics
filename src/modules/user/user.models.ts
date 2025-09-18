import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";

// Attributes for the User model
export interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city_id: number;
  picture?: string;
  is_verified: number;
  created_at?: Date;
  updated_at?: Date;
}

// Input type for creation
export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "first_name"
    | "last_name"
    | "phone"
    | "city_id"
    | "picture"
    | "is_verified"
    | "created_at"
    | "updated_at"
  > {}

// Sequelize model class
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone!: string;
  public city_id!: number;
  public picture?: string;
  public is_verified!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// Defining table + columns
User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    first_name: { type: DataTypes.STRING(100), allowNull: true},
    last_name: { type: DataTypes.STRING(100), allowNull: true},
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true},
    phone: { type: DataTypes.STRING(20), allowNull: true},
    city_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true},
    picture: { type: DataTypes.STRING(255), allowNull: true },
    is_verified: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0},
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  },
  {
    sequelize,
    tableName: "users_table",
    modelName: "User",
    timestamps: false,
  }
);

export default User;
