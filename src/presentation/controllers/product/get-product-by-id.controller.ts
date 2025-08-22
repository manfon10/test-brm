import { GetProductByIdUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class GetProductByIdController implements Controller {
  constructor(private readonly getProductByIdUseCase: GetProductByIdUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.params;

      const product = await this.getProductByIdUseCase.execute(id);

      return {
        message: "Product retrieved successfully",
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
