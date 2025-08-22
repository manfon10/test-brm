import { GetProductByIdUseCase } from "../../../../domain/use-cases";
import { GetProductByIdController } from "../../../../presentation/controllers/product";

import { ProductDatasourceImpl } from "../../../datasources";
import { ProductRepositoryImpl } from "../../../repositories";

export const makeGetProductByIdController = (): GetProductByIdController => {
  const productDatasource = new ProductDatasourceImpl();
  const productRepository = new ProductRepositoryImpl(productDatasource);

  const useCase = new GetProductByIdUseCase(productRepository);

  return new GetProductByIdController(useCase);
};
