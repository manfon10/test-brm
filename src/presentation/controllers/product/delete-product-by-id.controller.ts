import { DeleteProductByIdUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class DeleteProductByIdController implements Controller {
  constructor(private readonly deleteProductByIdUseCase: DeleteProductByIdUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.params;

      const product = await this.deleteProductByIdUseCase.execute(id);

      return {
        message: "Product deleted successfully",
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
