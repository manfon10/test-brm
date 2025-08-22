import { JwtPayload } from "jsonwebtoken";
import { ExpirationTokenOutput, SignTokenDto } from "../dtos";

export abstract class TokenService {
  abstract decoded(token: string): JwtPayload | null;
  abstract generateAccessToken(data: SignTokenDto): string;
  abstract generateRefreshToken(data: SignTokenDto): string;
  abstract isTokenWithinExpirationThreshold(expirationTime: number): ExpirationTokenOutput;
  abstract refreshToken(tokenRefresh: string): void;
  abstract verifyToken(token: string): any;
}
