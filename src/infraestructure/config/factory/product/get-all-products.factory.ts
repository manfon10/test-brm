import { GetAllProductsUseCase } from "../../../../domain/use-cases";
import { GetAllProductsController } from "../../../../presentation/controllers/product";

import { ProductDatasourceImpl } from "../../../datasources";
import { ProductRepositoryImpl } from "../../../repositories";

export const makeGetAllProductsController = (): GetAllProductsController => {
  const productDatasource = new ProductDatasourceImpl();
  const productRepository = new ProductRepositoryImpl(productDatasource);

  const useCase = new GetAllProductsUseCase(productRepository);

  return new GetAllProductsController(useCase);
};
