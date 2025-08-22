import { AppError } from "../../../shared";

import { CreateUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";
import { PasswordService } from "../../services";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: PasswordService
  ) {}

  async execute({ email, last_names, names, password, role }: CreateUserDto): Promise<UserEntity> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw AppError.badRequest("Email already exists");
    }

    const passwordHash = await this.bcryptService.hash(password);

    const user = await this.userRepository.create({
      email,
      last_names,
      names,
      password: passwordHash,
      role,
    });

    return user;
  }
}
