import { DeleteProductByIdUseCase } from "../../../../domain/use-cases";
import { DeleteProductByIdController } from "../../../../presentation/controllers/product";

import { ProductDatasourceImpl } from "../../../datasources";
import { ProductRepositoryImpl } from "../../../repositories";

export const makeDeleteProductByIdController = (): DeleteProductByIdController => {
  const productDatasource = new ProductDatasourceImpl();
  const productRepository = new ProductRepositoryImpl(productDatasource);

  const useCase = new DeleteProductByIdUseCase(productRepository);

  return new DeleteProductByIdController(useCase);
};
