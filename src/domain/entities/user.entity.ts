export class UserEntity {
  constructor(
    public id: number,
    public email: string,
    public names: string,
    public last_names: string,
    public role: string,
    public password?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    return new UserEntity(
      object.id,
      object.email,
      object.names,
      object.last_names,
      object.role,
      object.password
    );
  }
}
