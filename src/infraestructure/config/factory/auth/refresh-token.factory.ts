import { RefreshTokenUseCase } from "../../../../domain/use-cases";
import { RefreshTokenController } from "../../../../presentation/controllers/auth";

import { UserDatasourceImpl } from "../../../datasources";
import { UserRepositoryImpl } from "../../../repositories";
import { JwtService } from "../../../services";

export const makeRefreshTokenController = (): RefreshTokenController => {
  const userDatasource = new UserDatasourceImpl();
  const userRepository = new UserRepositoryImpl(userDatasource);

  const tokenService = new JwtService();

  const useCase = new RefreshTokenUseCase(userRepository, tokenService);

  return new RefreshTokenController(useCase);
};
