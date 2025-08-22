import { GetAllOrdersUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class GetAllOrdersController implements Controller {
  constructor(private readonly getAllOrdersUseCase: GetAllOrdersUseCase) {}

  async handle(
    _httpRequest: HttpRequest,
    httpNext: HttpNext["next"]
  ): Promise<HttpResponse | void> {
    try {
      const orders = await this.getAllOrdersUseCase.execute();

      return {
        message: "Orders retrieved successfully",
        statusCode: 200,
        body: orders,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
