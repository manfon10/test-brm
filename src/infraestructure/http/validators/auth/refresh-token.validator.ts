import { body } from "express-validator";
import { ValidatorMiddleware } from "../../middlewares";

const refreshToken = [
  body("token")
    .notEmpty()
    .withMessage("Token is required")
    .isString()
    .withMessage("Token must be a string")
    .isJWT()
    .withMessage("Token must be a valid JWT format"),
];

export const refreshTokenValidator = new ValidatorMiddleware(refreshToken);
