import { GetProductByIdUseCase, UpdateProductByIdUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class UpdateProductByIdController implements Controller {
  constructor(private readonly updateProductByIdUseCase: UpdateProductByIdUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.params;

      const productData = httpRequest.body;

      const product = await this.updateProductByIdUseCase.execute(id, productData);

      return {
        message: "Product updated successfully",
        statusCode: 201,
        body: product,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
