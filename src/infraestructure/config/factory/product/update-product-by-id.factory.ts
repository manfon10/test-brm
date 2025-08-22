import { UpdateProductByIdUseCase } from "../../../../domain/use-cases";
import { UpdateProductByIdController } from "../../../../presentation/controllers/product";

import { ProductDatasourceImpl } from "../../../datasources";
import { ProductRepositoryImpl } from "../../../repositories";

export const makeUpdateProductByIdController = (): UpdateProductByIdController => {
  const productDatasource = new ProductDatasourceImpl();
  const productRepository = new ProductRepositoryImpl(productDatasource);

  const useCase = new UpdateProductByIdUseCase(productRepository);

  return new UpdateProductByIdController(useCase);
};
