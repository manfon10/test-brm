import { Sequelize } from "sequelize";

import { CreateOrderDto, OrderDatasource, OrderEntity, SaveItemsDto } from "../../domain";

import Invoice from "../database/models/invoice.model";
import OrderItem from "../database/models/order-item.model";
import Order from "../database/models/order.model";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";

export class OrderDatasourceImpl implements OrderDatasource {
  async create(data: CreateOrderDto): Promise<OrderEntity> {
    const order = await Order.create(data);

    return OrderEntity.fromObject(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    const orders = await Order.findAll({
      attributes: [
        "id",
        ["created_at", "created_order"],
        [
          Sequelize.literal(
            'CAST((SELECT COALESCE(SUM(subtotal), 0) FROM order_items WHERE order_items.order_id = "Order".id) AS INTEGER)'
          ),
          "total_price",
        ],
      ],
      include: [
        {
          as: "items",
          attributes: ["id", "quantity", "unit_price", "subtotal"],
          include: [
            {
              as: "product",
              attributes: [
                "id",
                "batch_number",
                "name",
                "price",
                "quantity_available",
                "entry_date",
              ],
              model: Product,
            },
          ],
          model: OrderItem,
        },
        {
          as: "client",
          attributes: ["id", "names", "last_names", "email", "role"],
          model: User,
        },
        {
          as: "invoice",
          attributes: ["id", "invoice_number", "issue_date", "total_amount"],
          model: Invoice,
        },
      ],
    });

    return orders.map((order) => OrderEntity.fromObject(order.dataValues));
  }

  async findById(id: number): Promise<OrderEntity | null> {
    const order = await Order.findOne({
      attributes: [
        "id",
        ["created_at", "created_order"],
        [
          Sequelize.literal(
            'CAST((SELECT COALESCE(SUM(subtotal), 0) FROM order_items WHERE order_items.order_id = "Order".id) AS INTEGER)'
          ),
          "total_price",
        ],
      ],
      include: [
        {
          as: "items",
          attributes: ["id", "quantity", "unit_price", "subtotal"],
          include: [
            {
              as: "product",
              attributes: [
                "id",
                "batch_number",
                "name",
                "price",
                "quantity_available",
                "entry_date",
              ],
              model: Product,
            },
          ],
          model: OrderItem,
        },
        {
          as: "client",
          attributes: ["id", "names", "last_names", "email", "role"],
          model: User,
        },
      ],
      where: { id },
    });

    return order ? OrderEntity.fromObject(order.dataValues) : null;
  }

  async findAllByUserId(user_id: number): Promise<OrderEntity[]> {
    const orders = await Order.findAll({
      attributes: [
        "id",
        ["created_at", "created_order"],
        [
          Sequelize.literal(
            'CAST((SELECT COALESCE(SUM(subtotal), 0) FROM order_items WHERE order_items.order_id = "Order".id) AS INTEGER)'
          ),
          "total_price",
        ],
      ],
      include: [
        {
          as: "items",
          attributes: ["id", "quantity", "unit_price", "subtotal"],
          include: [
            {
              as: "product",
              attributes: [
                "id",
                "batch_number",
                "name",
                "price",
                "quantity_available",
                "entry_date",
              ],
              model: Product,
            },
          ],
          model: OrderItem,
        },
        {
          as: "client",
          attributes: ["id", "names", "last_names", "email", "role"],
          model: User,
        },
        {
          as: "invoice",
          attributes: ["id", "invoice_number", "issue_date", "total_amount"],
          model: Invoice,
        },
      ],
      where: { user_id },
    });

    return orders.map((order) => OrderEntity.fromObject(order.dataValues));
  }

  async saveItems(data: SaveItemsDto[]): Promise<void> {
    await OrderItem.bulkCreate(data);
  }
}
