import { body } from "express-validator";
import { ValidatorMiddleware } from "../../middlewares";

const createOrder = [
  body("items")
    .isArray()
    .withMessage("Items must be an array")
    .notEmpty()
    .withMessage("Items array cannot be empty"),
  body("items.*.product_id")
    .notEmpty()
    .withMessage("Product ID is required for each item")
    .isInt()
    .withMessage("Product ID must be a number"),
  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required for each item")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive number"),
];

export const createOrderValidator = new ValidatorMiddleware(createOrder);
