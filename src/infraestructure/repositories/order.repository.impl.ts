import {
  CreateOrderDto,
  OrderDatasource,
  OrderEntity,
  OrderRepository,
  SaveItemsDto,
} from "../../domain";

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly datasource: OrderDatasource) {}

  async create(data: CreateOrderDto): Promise<OrderEntity> {
    return this.datasource.create(data);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.datasource.findAll();
  }

  async findAllByUserId(user_id: number): Promise<OrderEntity[]> {
    return this.datasource.findAllByUserId(user_id);
  }

  async findById(id: number): Promise<OrderEntity | null> {
    return this.datasource.findById(id);
  }

  async saveItems(data: SaveItemsDto[]): Promise<void> {
    return this.datasource.saveItems(data);
  }
}
