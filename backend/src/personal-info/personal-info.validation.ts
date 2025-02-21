import { body } from "express-validator";

export const createPersonalInfo = [
  body("fullName")
    .notEmpty()
    .withMessage("fullName is required")
    .isString()
    .withMessage("fullName must be a string"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string"),
  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isString()
    .withMessage("phone must be a string"),
  body("address")
    .notEmpty()
    .withMessage("address is required")
    .isString()
    .withMessage("address must be a string"),
];
