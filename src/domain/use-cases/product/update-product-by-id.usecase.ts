import { AppError } from "../../../shared";

import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

export class UpdateProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number, productData: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw AppError.badRequest("Product not found");
    }

    const newProduct = await this.productRepository.update(id, productData);

    return newProduct;
  }
}
