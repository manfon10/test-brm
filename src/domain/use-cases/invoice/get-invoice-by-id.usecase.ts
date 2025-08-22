import { AppError } from "../../../shared";

import { InvoiceEntity } from "../../entities";
import { InvoiceRepository } from "../../repositories";

export class GetInvoiceByIdUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(invoice_number: string): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.findByInvoiceNumber(invoice_number);

    if (!invoice) {
      throw AppError.badRequest("Invoice not found");
    }

    return invoice;
  }
}
