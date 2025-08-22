import { CreateOrderDto, SaveItemsDto } from "../dtos";
import { OrderEntity } from "../entities";

export abstract class OrderDatasource {
  abstract create(data: CreateOrderDto): Promise<OrderEntity>;
  abstract saveItems(data: SaveItemsDto[]): Promise<void>;
  abstract findAll(): Promise<OrderEntity[]>;
  abstract findAllByUserId(user_id: number): Promise<OrderEntity[]>;
  abstract findById(id: number): Promise<OrderEntity | null>;
}
