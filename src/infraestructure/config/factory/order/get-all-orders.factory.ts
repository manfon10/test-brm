import { GetAllOrdersUseCase } from "../../../../domain/use-cases";
import { GetAllOrdersController } from "../../../../presentation";

import { OrderDatasourceImpl } from "../../../datasources";
import { OrderRepositoryImpl } from "../../../repositories";

export const makeGetAllOrdersController = (): GetAllOrdersController => {
  const orderDatasource = new OrderDatasourceImpl();
  const orderRepository = new OrderRepositoryImpl(orderDatasource);

  const useCase = new GetAllOrdersUseCase(orderRepository);

  return new GetAllOrdersController(useCase);
};
