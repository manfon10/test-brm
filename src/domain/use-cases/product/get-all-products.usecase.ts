import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    const products = await this.productRepository.findAll();

    return products;
  }
}
