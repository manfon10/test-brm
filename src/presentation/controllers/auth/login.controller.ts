import { LoginUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class LoginController implements Controller {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { email, password } = httpRequest.body;

      const user = await this.loginUseCase.execute(email, password);

      return {
        message: "User logged in successfully",
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
