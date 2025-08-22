import { RefreshTokenUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class RefreshTokenController implements Controller {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { token } = httpRequest.body;

      const user = await this.refreshTokenUseCase.execute(token);

      return {
        message: "User refreshed token successfully",
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
