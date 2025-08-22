import { GetAllMyOrdersUseCase, GetAllOrdersUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class GetAllMyOrdersController implements Controller {
  constructor(private readonly getAllMyOrdersUseCase: GetAllMyOrdersUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.user!;

      const orders = await this.getAllMyOrdersUseCase.execute(id);

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
