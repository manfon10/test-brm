import { GetAllProductsUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class GetAllProductsController implements Controller {
  constructor(private readonly getAllProductsUseCase: GetAllProductsUseCase) {}

  async handle(
    _httpRequest: HttpRequest,
    httpNext: HttpNext["next"]
  ): Promise<HttpResponse | void> {
    try {
      const products = await this.getAllProductsUseCase.execute();

      return {
        message: "Products retrieved successfully",
        statusCode: 200,
        body: products,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
