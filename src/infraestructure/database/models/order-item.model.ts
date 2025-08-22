import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "../sequelize";

interface OrderAttributes {
  id: number;
  order_id: number;
  user_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

type OrderCreationAttributes = Partial<OrderAttributes>;

class OrderItem extends Model<OrderAttributes, OrderCreationAttributes> {
  public id!: number;
  public user_id!: number;
  public total_price!: string;

  static associate(models: { [key: string]: SequelizeModel }) {
    OrderItem.belongsTo(models.Order, { as: "order", foreignKey: "order_id" });

    OrderItem.belongsTo(models.Product, { as: "product", foreignKey: "product_id" });
  }

  static initModel(sequelize: Sequelize) {
    OrderItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "orders",
            key: "id",
          },
          onDelete: "CASCADE",
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
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        unit_price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        subtotal: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { modelName: "OrderItem", paranoid: true, sequelize }
    );
  }
}

export default OrderItem;
