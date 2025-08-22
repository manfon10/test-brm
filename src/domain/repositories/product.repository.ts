import { CreateProductDto } from "../dtos";
import { ProductEntity } from "../entities";

export abstract class ProductRepository {
  abstract create(product: CreateProductDto): Promise<ProductEntity>;
  abstract findAll(): Promise<ProductEntity[]>;
  abstract findById(id: number): Promise<ProductEntity | null>;
  abstract update(id: number, product: Partial<ProductEntity>): Promise<ProductEntity>;
  abstract delete(id: number): Promise<void>;
}
