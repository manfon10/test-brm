import { AppError } from "../../../shared";
import { AuthEntity } from "../../entities";
import { UserRepository } from "../../repositories/user.repository";
import { PasswordService, TokenService } from "../../services";

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: PasswordService,
    private readonly jwtService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<AuthEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw AppError.badRequest("Incorrect credentials");
    }

    const isPasswordValid = await this.bcryptService.compare(password, user.password!);

    if (!isPasswordValid) {
      throw AppError.badRequest("Incorrect credentials");
    }

    const refresh_token = this.jwtService.generateRefreshToken({ id: user.id });

    const access_token = this.jwtService.generateAccessToken({ id: user.id });

    const { password: userPassword, ...userData } = user;

    await this.userRepository.updateRefreshToken(user.id, refresh_token);

    return AuthEntity.fromObject({ user: userData, access_token, refresh_token });
  }
}
