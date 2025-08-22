export interface CreateInvoiceDto {
  order_id: number;
  invoice_number: string;
  issue_date: Date;
  total_amount: number;
}
