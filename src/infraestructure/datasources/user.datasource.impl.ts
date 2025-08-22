import { CreateUserDto, UserDatasource, UserEntity } from "../../domain";

import User from "../database/models/user.model";

export class UserDatasourceImpl implements UserDatasource {
  async create(user: CreateUserDto): Promise<UserEntity> {
    const userCreated = await User.create(user);

    return UserEntity.fromObject(userCreated);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      attributes: ["id", "names", "last_names", "email", "role"],
      where: { id },
    });

    return user ? UserEntity.fromObject(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      attributes: ["id", "names", "last_names", "email", "role", "password"],
      where: { email },
    });

    return user ? UserEntity.fromObject(user) : null;
  }

  async findByRefreshToken(refreshToken: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      attributes: ["id", "names", "last_names", "email", "role", "password"],
      where: { refresh_token: refreshToken },
    });

    return user ? UserEntity.fromObject(user) : null;
  }

  async update(id: number, user: Partial<CreateUserDto>): Promise<UserEntity> {
    const [, [updatedUser]] = await User.update(user, {
      where: { id },
      returning: true,
    });

    return UserEntity.fromObject(updatedUser);
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await User.update({ refresh_token: refreshToken }, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await User.destroy({ where: { id } });
  }
}
