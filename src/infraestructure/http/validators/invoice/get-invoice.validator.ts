import { param } from "express-validator";
import { ValidatorMiddleware } from "../../middlewares";

const getInvoice = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isUUID()
    .withMessage("ID must be a valid UUID format"),
];

export const getInvoiceValidator = new ValidatorMiddleware(getInvoice);
