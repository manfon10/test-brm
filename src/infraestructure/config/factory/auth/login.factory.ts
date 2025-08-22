import { LoginUseCase } from "../../../../domain/use-cases";
import { LoginController } from "../../../../presentation/controllers/auth";

import { UserDatasourceImpl } from "../../../datasources";
import { UserRepositoryImpl } from "../../../repositories";
import { BcryptService, JwtService } from "../../../services";

export const makeLoginController = (): LoginController => {
  const userDatasource = new UserDatasourceImpl();
  const userRepository = new UserRepositoryImpl(userDatasource);

  const passwordService = new BcryptService();

  const tokenService = new JwtService();

  const useCase = new LoginUseCase(userRepository, passwordService, tokenService);

  return new LoginController(useCase);
};
