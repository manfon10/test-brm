type Role = "admin" | "client";

export interface CreateUserDto {
  email: string;
  names: string;
  last_names: string;
  password: string;
  role: Role;
}
