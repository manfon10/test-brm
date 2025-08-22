import { InvoiceEntity } from "./invoice.entity";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

export class OrderItemEntity {
  constructor(
    public id: number,
    public quantity: number,
    public unit_price: number,
    public subtotal: number,
    public product: ProductEntity
  ) {}

  static fromObject(object: { [key: string]: any }): OrderItemEntity {
    const { id, product, quantity, unit_price, subtotal } = object;

    return new OrderItemEntity(id, quantity, unit_price, subtotal, product);
  }
}

export class OrderEntity {
  constructor(
    public id: number,
    public total_price: number,
    public client: UserEntity,
    public items: OrderItemEntity[],
    public invoice: InvoiceEntity
  ) {}

  static fromObject(object: { [key: string]: any }): OrderEntity {
    const { id, total_price, client, items, invoice } = object;

    return new OrderEntity(id, total_price, client, items, invoice);
  }
}
