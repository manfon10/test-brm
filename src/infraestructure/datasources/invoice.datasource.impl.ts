import { CreateInvoiceDto, InvoiceDatasource, InvoiceEntity } from "../../domain";

import Invoice from "../database/models/invoice.model";
import OrderItem from "../database/models/order-item.model";
import Order from "../database/models/order.model";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";

export class InvoiceDatasourceImpl implements InvoiceDatasource {
  async create(data: CreateInvoiceDto): Promise<InvoiceEntity> {
    const invoice = await Invoice.create(data);

    return InvoiceEntity.fromObject(invoice);
  }

  async findByUserId(user_id: number): Promise<InvoiceEntity[]> {
    const invoices = await Invoice.findAll({
      attributes: ["id", "invoice_number", "issue_date", "total_amount"],
      include: [
        {
          as: "order",
          attributes: ["id", ["created_at", "created_order"]],
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
          model: Order,
          where: { user_id },
        },
      ],
    });

    return invoices.map(InvoiceEntity.fromObject);
  }

  async findByInvoiceNumber(invoice_number: string): Promise<InvoiceEntity | null> {
    const invoice = await Invoice.findOne({
      attributes: ["id", "invoice_number", "issue_date", "total_amount"],
      include: [
        {
          as: "order",
          attributes: ["id", ["created_at", "created_order"]],
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
          model: Order,
        },
      ],
      where: { invoice_number },
    });

    return invoice ? InvoiceEntity.fromObject(invoice) : null;
  }
}
