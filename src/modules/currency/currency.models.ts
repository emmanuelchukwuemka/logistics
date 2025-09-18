import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";

export interface CurrencyAttributes {
  id: number;
  code: string;
  name: string;
  symbol: string;
  decimal_places?: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CurrencyCreationAttributes
  extends Optional<CurrencyAttributes, "id" | "decimal_places" | "status"> {}

class Currency
  extends Model<CurrencyAttributes, CurrencyCreationAttributes>
  implements CurrencyAttributes
{
  public id!: number;
  public code!: string;
  public name!: string;
  public symbol!: string;
  public decimal_places!: number;
  public status!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Currency.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    decimal_places: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 2,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Currency",
    tableName: "currencies",
    timestamps: false,
    underscored: true,
  }
);

export default Currency;
