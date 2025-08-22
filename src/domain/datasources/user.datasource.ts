import { CreateUserDto } from "../dtos";
import { UserEntity } from "../entities";

export abstract class UserDatasource {
  abstract create(user: CreateUserDto): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findByRefreshToken(refreshToken: string): Promise<UserEntity | null>;
  abstract update(id: number, user: Partial<CreateUserDto>): Promise<UserEntity>;
  abstract updateRefreshToken(id: number, refreshToken: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
