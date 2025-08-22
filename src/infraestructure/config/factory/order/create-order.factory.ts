import { CreateOrderUseCase } from "../../../../domain/use-cases";
import { CreateOrderController } from "../../../../presentation";

import {
  InvoiceDatasourceImpl,
  OrderDatasourceImpl,
  ProductDatasourceImpl,
} from "../../../datasources";
import {
  InvoiceRepositoryImpl,
  OrderRepositoryImpl,
  ProductRepositoryImpl,
} from "../../../repositories";

export const makeCreateOrderController = (): CreateOrderController => {
  const orderDatasource = new OrderDatasourceImpl();
  const orderRepository = new OrderRepositoryImpl(orderDatasource);

  const productDatasource = new ProductDatasourceImpl();
  const productRepository = new ProductRepositoryImpl(productDatasource);

  const invoiceDatasource = new InvoiceDatasourceImpl();
  const invoiceRepository = new InvoiceRepositoryImpl(invoiceDatasource);

  const useCase = new CreateOrderUseCase(orderRepository, productRepository, invoiceRepository);

  return new CreateOrderController(useCase);
};
