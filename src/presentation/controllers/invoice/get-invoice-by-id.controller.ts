import { GetInvoiceByIdUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class GetInvoiceByIdController implements Controller {
  constructor(private readonly getInvoiceByIdUseCase: GetInvoiceByIdUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.params;

      const invoice = await this.getInvoiceByIdUseCase.execute(id);

      return {
        message: "Invoice retrieved successfully",
        statusCode: 200,
        body: invoice,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
