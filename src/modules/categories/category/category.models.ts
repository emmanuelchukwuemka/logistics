import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { MainCategory } from "../maincategory/maincategory.models";

export interface CategoryModel {
  id: number;
  maincategory_id: number;
  name: string;
  label: string;
  image: string | null;
  status: number;
}

export interface MainCreationAttributes
  extends Optional<CategoryModel, "id" | "status"> {}

export class Category
  extends Model<CategoryModel, MainCreationAttributes>
  implements Category
{
  public id!: number;
  maincategory_id!: number;
  public name!: string;
  public label!: string;
  public image!: string;
  public status!: number;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    maincategory_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: MainCategory, // Foreign key
        key: "id",
      },
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    label: { type: DataTypes.STRING(255), allowNull: false },
    image: { type: DataTypes.STRING(255), allowNull: true },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "category",
    modelName: "Category",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Category.belongsTo(MainCategory, {
  foreignKey: "maincategory_id",
  as: "maincategory",
});

// Associations
MainCategory.hasMany(Category, {
  foreignKey: "maincategory_id",
  as: "categories",
});

export default Category;

