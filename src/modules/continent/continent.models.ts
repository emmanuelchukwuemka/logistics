import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";

export interface ContinentAttributes {
  id: number;
  name: string;
  status: number;
}

export interface ContinentCreationAttributes
  extends Optional<ContinentAttributes, "id" | "status"> {}

export class Continent
  extends Model<ContinentAttributes, ContinentCreationAttributes>
  implements ContinentAttributes
{
  public id!: number;
  public name!: string;
  public status!: number;
}

Continent.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "continents",
    modelName: "Continent",
    timestamps: false,
  }
);

export default Continent;
