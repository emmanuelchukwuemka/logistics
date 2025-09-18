import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import Category from "../category/category.models";


// Subcategory attributes
interface SubcategoryAttributes {
  id: number;
  category_id: number;
  name: string;
  label: string;
  image?: string | null;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

// Input type for creation (id, timestamps optional)
type SubcategoryCreationAttributes = Optional<
  SubcategoryAttributes,
  "id" | "image" | "status" | "created_at" | "updated_at"
>;

export class Subcategory
  extends Model<SubcategoryAttributes, SubcategoryCreationAttributes>
  implements SubcategoryAttributes
{
  public id!: number;
  public category_id!: number;
  public name!: string;
  public label!: string;
  public image!: string | null;
  public status!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Subcategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Category, // Foreign key
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "subcategory",
    timestamps: false,
    underscored: true,
  }
);

// Association: Subcategory belongs to Category
Subcategory.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

// A Category can have many Subcategories
Category.hasMany(Subcategory, {
  foreignKey: "category_id",
  as: "subcategories",
});
