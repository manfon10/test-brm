import { RegisterUserUseCase } from "../../../domain/use-cases";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../shared";

export class RegisterUserController implements Controller {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const user = await this.registerUserUseCase.execute(httpRequest.body);

      return {
        message: "User created successfully",
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      httpNext(error);
    }
  }
}
