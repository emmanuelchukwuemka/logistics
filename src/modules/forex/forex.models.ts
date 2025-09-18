import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";
import Currency from "../currency/currency.models";

export interface ExchangeRateAttributes {
  id: number;
  base_id: number;
  target_id: number;
  rate: number;
  provider?: string | null;
  created_at: Date;
  updated_at: Date;
}

// For creation, id and updated_at are optional
export interface ExchangeRateCreationAttributes
  extends Optional<
    ExchangeRateAttributes,
    "id" | "created_at" | "updated_at" | "provider"
  > {}

export class ExchangeRate
  extends Model<ExchangeRateAttributes, ExchangeRateCreationAttributes>
  implements ExchangeRateAttributes
{
  public id!: number;
  public base_id!: number;
  public target_id!: number;
  public rate!: number;
  public provider!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

ExchangeRate.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    base_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    target_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
    tableName: "exchange_rates",
    modelName: "ExchangeRate",
    timestamps: false,
    indexes: [
      { fields: ["base_id"] },
      { fields: ["target_id"] },
      {
        unique: true,
        fields: ["base_id", "target_id"],
      },
    ],
  }
);

ExchangeRate.belongsTo(Currency, {
  as: "base",
  foreignKey: "base_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ExchangeRate.belongsTo(Currency, {
  as: "target",
  foreignKey: "target_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export default ExchangeRate;
