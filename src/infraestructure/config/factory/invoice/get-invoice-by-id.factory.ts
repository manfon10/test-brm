import { GetInvoiceByIdUseCase } from "../../../../domain";
import { GetInvoiceByIdController } from "../../../../presentation";

import { InvoiceDatasourceImpl } from "../../../datasources";
import { InvoiceRepositoryImpl } from "../../../repositories";

export const makeGetInvoiceByIdController = (): GetInvoiceByIdController => {
  const invoiceDatasource = new InvoiceDatasourceImpl();
  const invoiceRepository = new InvoiceRepositoryImpl(invoiceDatasource);

  const useCase = new GetInvoiceByIdUseCase(invoiceRepository);

  return new GetInvoiceByIdController(useCase);
};
