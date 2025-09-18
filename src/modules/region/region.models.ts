import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";
import Continent from "../continent/continent.models";

export interface RegionModel {
  id: number;
  continent_id: number;
  name: string;
  status: number;
}

export interface RegionCreationAttributes
  extends Optional<RegionModel, "id" | "status"> {}

export class Region
  extends Model<RegionModel, RegionCreationAttributes>
  implements RegionModel
{
  public id!: number;
  public continent_id!: number;
  public name!: string;
  public status!: number;
}

Region.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    continent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    status: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "regions",
    modelName: "Region",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Region.belongsTo(Continent, {
  foreignKey: "continent_id",
  as: "continent",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Continent.hasMany(Region, {
  foreignKey: "continent_id",
  as: "regions",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export default Region;
