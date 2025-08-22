import {
  CreateInvoiceDto,
  InvoiceDatasource,
  InvoiceEntity,
  InvoiceRepository,
} from "../../domain";

export class InvoiceRepositoryImpl implements InvoiceRepository {
  constructor(private readonly datasource: InvoiceDatasource) {}

  async create(data: CreateInvoiceDto): Promise<InvoiceEntity> {
    return this.datasource.create(data);
  }

  async findByUserId(user_id: number): Promise<InvoiceEntity[]> {
    return this.datasource.findByUserId(user_id);
  }

  async findByInvoiceNumber(invoice_number: string): Promise<InvoiceEntity | null> {
    return this.datasource.findByInvoiceNumber(invoice_number);
  }
}
