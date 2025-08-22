import { AppError } from "../../../shared";

import { ProductRepository } from "../../repositories";

export class DeleteProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw AppError.badRequest("Product not found");
    }

    await this.productRepository.delete(id);
  }
}
