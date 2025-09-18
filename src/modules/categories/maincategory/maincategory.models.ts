import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";

export interface Maincategory {
  id: number;
  name: string;
  label: string;
  image: string;
  status: number;
}

export interface MainCreationAttributes
  extends Optional<Maincategory, "id" | "status"> {}

export class MainCategory
  extends Model<Maincategory, MainCreationAttributes>
  implements Maincategory
{
  public id!: number;
  public name!: string;
  public label!: string;
  public image!: string;
  public status!: number;
}

MainCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    label: { type: DataTypes.STRING(255), allowNull: false },
    image: { type: DataTypes.STRING(255), allowNull: false },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "maincategory",
    modelName: "MainCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default MainCategory;
