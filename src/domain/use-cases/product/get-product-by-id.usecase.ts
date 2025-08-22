import { AppError } from "../../../shared";

import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw AppError.badRequest("Product not found");
    }

    return product;
  }
}
