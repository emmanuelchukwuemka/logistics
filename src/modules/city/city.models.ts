import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";
import State from "../state/state.models";

export interface CityAttributes {
  id: number;
  name: string;
  state_id: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CityCreationAttributes
  extends Optional<CityAttributes, "id" | "status"> {}

class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  public id!: number;
  public name!: string;
  public state_id!: number;
  public status!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    state_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: State, key: "id" },
    },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "City",
    tableName: "cities",
    timestamps: false,
    underscored: true,
  }
);

// Associations
City.belongsTo(State, {
  foreignKey: "state_id",
  as: "state",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
State.hasMany(City, {
  foreignKey: "state_id",
  as: "cities",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export default City;
