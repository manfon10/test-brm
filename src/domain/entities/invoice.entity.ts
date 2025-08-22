import { OrderEntity } from "./order.entity";

export class InvoiceEntity {
  constructor(
    public id: number,
    public invoice_number: string,
    public issue_date: Date,
    public total_amount: number,
    public order: OrderEntity
  ) {}

  static fromObject(object: { [key: string]: any }): InvoiceEntity {
    const { id, invoice_number, issue_date, total_amount, order } = object;

    return new InvoiceEntity(id, invoice_number, issue_date, total_amount, order);
  }
}
