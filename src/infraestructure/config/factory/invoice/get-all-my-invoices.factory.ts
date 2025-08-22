import { GetAllMyInvoicesUseCase } from "../../../../domain";
import { GetAllMyInvoicesController } from "../../../../presentation";

import { InvoiceDatasourceImpl } from "../../../datasources";
import { InvoiceRepositoryImpl } from "../../../repositories";

export const makeGetAllMyInvoicesController = (): GetAllMyInvoicesController => {
  const invoiceDatasource = new InvoiceDatasourceImpl();
  const invoiceRepository = new InvoiceRepositoryImpl(invoiceDatasource);

  const useCase = new GetAllMyInvoicesUseCase(invoiceRepository);

  return new GetAllMyInvoicesController(useCase);
};
