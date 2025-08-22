import { body } from "express-validator";
import { ValidatorMiddleware } from "../../middlewares";

const register = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("names")
    .notEmpty()
    .withMessage("Names are required")
    .isString()
    .withMessage("Names must be a string"),
  body("last_names")
    .notEmpty()
    .withMessage("Last names are required")
    .isString()
    .withMessage("Last names must be a string"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "client"])
    .withMessage("Role must be either 'admin' or 'client'"),
];

export const registerValidator = new ValidatorMiddleware(register);
