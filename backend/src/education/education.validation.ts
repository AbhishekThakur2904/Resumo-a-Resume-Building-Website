import { body } from "express-validator";

export const createEducation = [
  body("education.*.school")
    .notEmpty()
    .withMessage("school is required")
    .isString()
    .withMessage("school must be a string"),
  body("education.*.degree")
    .notEmpty()
    .withMessage("degree is required")
    .isString()
    .withMessage("degree must be a string"),
  body("education.*.startDate")
    .notEmpty()
    .withMessage("startDate is required")
    .isString()
    .withMessage("startDate must be a string"),
  body("education.*.endDate")
    .notEmpty()
    .withMessage("endDate is required")
    .isString()
    .withMessage("endDate must be a string"),
];

