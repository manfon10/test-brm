import {
  CreateProductDto,
  ProductDatasource,
  ProductEntity,
  ProductRepository,
} from "../../domain";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private datasource: ProductDatasource) {}

  async create(product: CreateProductDto): Promise<ProductEntity> {
    return this.datasource.create(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.datasource.findAll();
  }

  async findById(id: number): Promise<ProductEntity | null> {
    return this.datasource.findById(id);
  }

  async update(id: number, product: Partial<ProductEntity>): Promise<ProductEntity> {
    return this.datasource.update(id, product);
  }

  async delete(id: number): Promise<void> {
    return this.datasource.delete(id);
  }
}
