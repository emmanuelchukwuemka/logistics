import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";
import Country from "../country/country.models";

export interface StateAttributes {
  id: number;
  name: string;
  code: string;
  country_id: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface StateCreationAttributes
  extends Optional<StateAttributes, "id" | "status"> {}

class State
  extends Model<StateAttributes, StateCreationAttributes>
  implements StateAttributes
{
  public id!: number;
  public name!: string;
  public code!: string;
  public country_id!: number;
  public status!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

State.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Country, key: "id" },
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
    modelName: "State",
    tableName: "states",
    timestamps: false,
    underscored: true,
  }
);

// A State belongs to a Country
State.belongsTo(Country, {
  foreignKey: "country_id",
  as: "country",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// A Country has many States
Country.hasMany(State, {
  foreignKey: "country_id",
  as: "states",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export default State;
