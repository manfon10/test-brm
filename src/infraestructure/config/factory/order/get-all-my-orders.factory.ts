import { GetAllMyOrdersUseCase } from "../../../../domain/use-cases";
import { GetAllMyOrdersController } from "../../../../presentation";

import { OrderDatasourceImpl } from "../../../datasources";
import { OrderRepositoryImpl } from "../../../repositories";

export const makeGetAllMyOrdersController = (): GetAllMyOrdersController => {
  const orderDatasource = new OrderDatasourceImpl();
  const orderRepository = new OrderRepositoryImpl(orderDatasource);

  const useCase = new GetAllMyOrdersUseCase(orderRepository);

  return new GetAllMyOrdersController(useCase);
};
