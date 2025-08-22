import { InvoiceEntity } from "../../entities";
import { InvoiceRepository } from "../../repositories";

export class GetAllMyInvoicesUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(user_id: number): Promise<InvoiceEntity[]> {
    const invoices = await this.invoiceRepository.findByUserId(user_id);

    return invoices;
  }
}
