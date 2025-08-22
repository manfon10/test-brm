import { param } from "express-validator";
import { ValidatorMiddleware } from "../../middlewares";

const getProduct = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt()
    .withMessage("Product ID must be a number")
    .toInt(),
];

export const getProductValidator = new ValidatorMiddleware(getProduct);
