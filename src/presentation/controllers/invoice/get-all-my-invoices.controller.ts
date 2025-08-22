import { GetAllMyInvoicesUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class GetAllMyInvoicesController implements Controller {
  constructor(private readonly getAllMyInvoicesUseCase: GetAllMyInvoicesUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.user!;

      const invoices = await this.getAllMyInvoicesUseCase.execute(id);

      return {
        message: "Invoices retrieved successfully",
        statusCode: 200,
        body: invoices,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
