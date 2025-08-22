import { OrderEntity } from "../../entities";
import { OrderRepository } from "../../repositories";

export class GetAllOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.findAll();

    return orders;
  }
}
