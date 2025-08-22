import { NextFunction, Response } from "express";

import { TokenService, UserRepository } from "../../../domain";
import { AppError, CustomRequest } from "../../../shared";

export class AuthHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: TokenService
  ) {}

  public verifyToken = async (req: CustomRequest, _res: Response, next: NextFunction) => {
    let token: string | null = "";

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    try {
      if (!token) return next(AppError.unauthorized("Token is required."));

      const decodedToken = this.jwtService.verifyToken(token);

      const user = await this.userRepository.findById(decodedToken.id);

      if (!user) {
        return next(AppError.unauthorized("User not found."));
      }

      req.user = user;

      next();
    } catch (error) {
      next(AppError.unauthorized(error as string));
    }
  };
}
