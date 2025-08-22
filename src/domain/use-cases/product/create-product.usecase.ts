import { CreateProductDto } from "../../dtos";

import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productData: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.create(productData);

    return product;
  }
}
