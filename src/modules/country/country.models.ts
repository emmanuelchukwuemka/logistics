import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";
import Region from "../region/region.models";

export interface CountryAttributes {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  region_id: number;
  currency_id: number;
  flag?: string | null;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

// When creating, id is optional (auto-increment), timestamps optional
export interface CountryCreationAttributes
  extends Optional<
    CountryAttributes,
    "id" | "flag" | "status" | "created_at" | "updated_at"
  > {}

class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  public id!: number;
  public name!: string;
  public iso2!: string;
  public iso3!: string;
  public region_id!: number;
  public currency_id!: number;
  public flag?: string | null;
  public status!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Country.init(
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
    iso2: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: true,
    },
    iso3: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    region_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Region,
        key: "id",
      },
    },
    currency_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "countries",
    modelName: "Country",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Country belongs to Region
Country.belongsTo(Region, {
  foreignKey: "region_id",
  as: "region",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Region.hasMany(Country, {
  foreignKey: "region_id",
  as: "countries",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export default Country;
