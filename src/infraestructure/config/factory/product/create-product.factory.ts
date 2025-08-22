import { CreateProductUseCase } from "../../../../domain/use-cases";
import { CreateProductController } from "../../../../presentation/controllers/product";

import { ProductDatasourceImpl } from "../../../datasources";
import { ProductRepositoryImpl } from "../../../repositories";

export const makeCreateProductController = (): CreateProductController => {
  const productDatasource = new ProductDatasourceImpl();
  const productRepository = new ProductRepositoryImpl(productDatasource);

  const useCase = new CreateProductUseCase(productRepository);

  return new CreateProductController(useCase);
};
