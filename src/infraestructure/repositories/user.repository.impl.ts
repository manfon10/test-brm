import { CreateUserDto, UserDatasource, UserEntity, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.datasource.findById(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.datasource.findByEmail(email);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserEntity | null> {
    return this.datasource.findByRefreshToken(refreshToken);
  }

  async update(id: number, user: Partial<CreateUserDto>): Promise<UserEntity> {
    return this.datasource.update(id, user);
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    return this.datasource.updateRefreshToken(id, refreshToken);
  }

  async delete(id: string): Promise<void> {
    return this.datasource.delete(id);
  }
}
