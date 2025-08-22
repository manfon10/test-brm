import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "../sequelize";

interface UserAttributes {
  id: number;
  names: string;
  last_names: string;
  email: string;
  password: string;
  role: string;
  refresh_token: string | null;
}

type UserCreationAttributes = Partial<UserAttributes>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;
  public names!: string;
  public last_names!: string;
  public role!: string;
  public refresh_token!: string | null;

  static associate(models: { [key: string]: SequelizeModel }) {
    User.hasMany(models.Order, { as: "orders", foreignKey: "user_id" });
  }

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        names: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_names: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        refresh_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      { modelName: "User", paranoid: true, sequelize }
    );
  }
}

export default User;
