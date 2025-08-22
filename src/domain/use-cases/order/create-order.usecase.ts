import { v4 as uuid } from "uuid";

import { AppError } from "../../../shared";

import { InvoiceRepository, OrderRepository, ProductRepository } from "../../repositories";
import { CreateOrderRequestDto, SaveItemsDto } from "../../dtos";
import { OrderEntity } from "../../entities";

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly invoicecRepository: InvoiceRepository
  ) {}

  async execute({ items, user_id }: CreateOrderRequestDto): Promise<OrderEntity> {
    const orderCreate = await this.orderRepository.create({ user_id });

    const orders = await Promise.all(
      items.map(async (item) => {
        const product = await this.productRepository.findById(item.product_id);

        if (product) {
          const orderItems: SaveItemsDto = {
            quantity: item.quantity,
            product_id: item.product_id,
            subtotal: product.price * item.quantity,
            unit_price: product.price,
            order_id: orderCreate.id,
            user_id,
          };

          return orderItems;
        }
      })
    );

    const validOrders = orders.filter((order): order is SaveItemsDto => order !== undefined);

    await this.orderRepository.saveItems(validOrders);

    const order = await this.orderRepository.findById(orderCreate.id);

    if (!order) {
      throw AppError.notFound("Order not found");
    }

    await this.invoicecRepository.create({
      invoice_number: uuid(),
      issue_date: new Date(),
      total_amount: order.total_price,
      order_id: order.id,
    });

    return order;
  }
}
