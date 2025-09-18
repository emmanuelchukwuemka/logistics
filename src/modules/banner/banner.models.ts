import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";

interface AppBannerAttributes {
  id: number;
  title: string;
  keywords: string;
  image: string;
  enabled: string;
  numberOfProducts: number;
  createdAt: string;
  updated_at: string;
  creatorID: number;
}

type AppBannerCreationAttributes = Optional<AppBannerAttributes, "id" | "numberOfProducts" | "createdAt" | "updated_at">;

export class AppBanner extends Model<AppBannerAttributes, AppBannerCreationAttributes>
  implements AppBannerAttributes {
  public id!: number;
  public title!: string;
  public keywords!: string;
  public image!: string;
  public enabled!: string;
  public numberOfProducts!: number;
  public createdAt!: string;
  public updated_at!: string;
  public creatorID!: number;
}

AppBanner.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      defaultValue: "Bloomzon Banner",
    },
    keywords: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      defaultValue: "Shoes,oil,iphones,nike,wallet,bags",
    },
    image: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    enabled: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfProducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      defaultValue: "September 9, 2024 at 12:15:07 PM GMT+1",
    },
    creatorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appBanner",
    timestamps: false, // since you’re storing createdAt and updated_at manually
  }
);
