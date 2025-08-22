import { OrderEntity } from "../../entities";
import { OrderRepository } from "../../repositories";

export class GetAllMyOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(user_id: number): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.findAllByUserId(user_id);

    return orders;
  }
}
