import { body, param } from "express-validator";
import { ValidatorMiddleware } from "../../middlewares";

const updateProduct = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt()
    .withMessage("Product ID must be a number")
    .toInt(),
  body("name").optional().isString().withMessage("Name must be a string").trim(),
  body("batch_number").optional().isString().withMessage("Batch number must be a string").trim(),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("quantity_available")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive number"),
  body("entry_date").optional().isISO8601().withMessage("Entry date must be a valid date"),
];

export const updateProductValidator = new ValidatorMiddleware(updateProduct);
