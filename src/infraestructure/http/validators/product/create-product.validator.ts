import { body } from "express-validator";
import { ValidatorMiddleware } from "../../middlewares";

const createProduct = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim(),
  body("batch_number")
    .notEmpty()
    .withMessage("Batch number is required")
    .isString()
    .withMessage("Batch number must be a string")
    .trim(),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("quantity_available")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive number"),
  body("entry_date")
    .notEmpty()
    .withMessage("Entry date is required")
    .isISO8601()
    .withMessage("Entry date must be a valid date"),
];

export const createProductValidator = new ValidatorMiddleware(createProduct);
