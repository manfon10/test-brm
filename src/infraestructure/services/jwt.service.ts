import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";

import { envs } from "../config";

import { ExpirationTokenOutput, SignTokenDto, TokenService } from "../../domain";
import { AppError } from "../../shared";

export class JwtService implements TokenService {
  decoded(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload | null;
    } catch (error) {
      return null;
    }
  }

  generateAccessToken(data: SignTokenDto): string {
    return jwt.sign(data, envs.JWT_SECRET as any, { expiresIn: envs.JWT_ACCESS_EXPIRES as any });
  }

  generateRefreshToken(data: SignTokenDto): string {
    return jwt.sign(data, envs.JWT_SECRET as any, { expiresIn: envs.JWT_REFRESH_EXPIRES as any });
  }

  isTokenWithinExpirationThreshold(expirationTime: number): ExpirationTokenOutput {
    const TOKEN_EXPIRATION = 5 * 60;
    const TOKEN_TOLERANCE = 15 * 60;

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    const timeRemaining = expirationTime - currentTimeInSeconds;

    if (timeRemaining > TOKEN_EXPIRATION) {
      return { renew: false, timeRemaining };
    }

    if (timeRemaining <= 0 && Math.abs(timeRemaining) <= TOKEN_TOLERANCE) {
      return { renew: true, timeRemaining };
    }

    return { renew: false, timeRemaining };
  }

  refreshToken(tokenRefresh: string): void {
    const decoded = jwt.decode(tokenRefresh, { complete: true });

    if (!decoded) throw AppError.unauthorized("Invalid token");

    const { exp } = decoded.payload as JwtPayload & SignTokenDto;

    const { renew } = this.isTokenWithinExpirationThreshold(exp!);

    if (!renew) {
      throw AppError.unauthorized("Token expirado, redirigir al login");
    }
  }

  verifyToken(token: string): any {
    let decodedToken: SignTokenDto | null = null;

    try {
      decodedToken = jwt.decode(token) as SignTokenDto | null;

      if (!decodedToken) {
        throw AppError.unauthorized("Token invalido.");
      }

      jwt.verify(token, envs.JWT_SECRET as string);

      return decodedToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw AppError.unauthorized("El token ha expirado");
      }

      if (error instanceof JsonWebTokenError) {
        throw AppError.unauthorized("Token inválido");
      }

      throw AppError.internalServer("Error al verificar el token");
    }
  }
}
