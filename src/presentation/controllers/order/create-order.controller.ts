import { CreateOrderUseCase, GetAllOrdersUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class CreateOrderController implements Controller {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { items } = httpRequest.body;

      const { id } = httpRequest.user!;

      const order = await this.createOrderUseCase.execute({ items, user_id: id });

      return {
        message: "Order created successfully",
        statusCode: 201,
        body: order,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
