import { RegisterUserUseCase } from "../../../../domain/use-cases";
import { RegisterUserController } from "../../../../presentation";

import { UserDatasourceImpl } from "../../../datasources";
import { UserRepositoryImpl } from "../../../repositories";
import { BcryptService } from "../../../services";

export const makeRegisterUserController = (): RegisterUserController => {
  const userDatasource = new UserDatasourceImpl();
  const userRepository = new UserRepositoryImpl(userDatasource);

  const passwordService = new BcryptService();

  const useCase = new RegisterUserUseCase(userRepository, passwordService);

  return new RegisterUserController(useCase);
};
