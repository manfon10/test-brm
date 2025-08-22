import { AppError } from "../../../shared";

import { AuthEntity } from "../../entities";
import { UserRepository } from "../../repositories";
import { TokenService } from "../../services";

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: TokenService
  ) {}

  async execute(refreshToken: string): Promise<AuthEntity> {
    const user = await this.userRepository.findByRefreshToken(refreshToken);

    if (!user) {
      throw AppError.badRequest("Invalid refresh token");
    }

    const decoded = this.jwtService.decoded(refreshToken);

    if (!decoded) {
      throw AppError.badRequest("Invalid refresh token");
    }

    const { renew } = this.jwtService.isTokenWithinExpirationThreshold(decoded.exp!);

    if (renew) {
      throw AppError.unauthorized("refresh token not renewed");
    }

    const refresh_token = this.jwtService.generateRefreshToken({ id: user.id });

    const access_token = this.jwtService.generateAccessToken({ id: user.id });

    const { password: userPassword, ...userData } = user;

    await this.userRepository.updateRefreshToken(user.id, refresh_token);

    return AuthEntity.fromObject({ user: userData, access_token, refresh_token });
  }
}
