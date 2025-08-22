import { CreateInvoiceDto } from "../dtos";
import { InvoiceEntity } from "../entities";

export abstract class InvoiceRepository {
  abstract create(data: CreateInvoiceDto): Promise<InvoiceEntity>;
  abstract findByUserId(user_id: number): Promise<InvoiceEntity[]>;
  abstract findByInvoiceNumber(invoice_number: string): Promise<InvoiceEntity | null>;
}
