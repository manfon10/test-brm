import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "../sequelize";

interface OrderAttributes {
  id: number;
  user_id: number;
}

type OrderCreationAttributes = Partial<OrderAttributes>;

class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  public id!: number;
  public user_id!: number;

  static associate(models: { [key: string]: SequelizeModel }) {
    Order.belongsTo(models.User, { as: "client", foreignKey: "user_id" });

    Order.hasMany(models.OrderItem, { as: "items", foreignKey: "order_id" });

    Order.hasOne(models.Invoice, { as: "invoice", foreignKey: "order_id" });
  }

  static initModel(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      { modelName: "Order", paranoid: true, sequelize }
    );
  }
}

export default Order;
