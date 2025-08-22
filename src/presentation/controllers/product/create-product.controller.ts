import { CreateProductUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class CreateProductController implements Controller {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const productData = httpRequest.body;

      const product = await this.createProductUseCase.execute(productData);

      return {
        message: "Product created successfully",
        statusCode: 201,
        body: product,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
