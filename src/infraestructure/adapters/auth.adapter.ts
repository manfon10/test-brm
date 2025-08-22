import { UserDatasourceImpl } from "../datasources";
import { AuthHandler } from "../http";
import { UserRepositoryImpl } from "../repositories";
import { JwtService } from "../services";

export class AuthAdapter {
  private authHandler: AuthHandler;

  constructor() {
    const userDataSource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDataSource);

    const jwtService = new JwtService();

    this.authHandler = new AuthHandler(userRepository, jwtService);
  }

  getHandler(): AuthHandler {
    return this.authHandler;
  }
}

export const authAdapter = new AuthAdapter().getHandler();
