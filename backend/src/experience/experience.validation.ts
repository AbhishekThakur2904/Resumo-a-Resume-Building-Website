import { body } from "express-validator";

export const createExperience = [
  body("experience.*.company")
    .notEmpty()
    .withMessage("company is required")
    .isString()
    .withMessage("company must be a string"),
  body("experience.*.position")
    .notEmpty()
    .withMessage("position is required")
    .isString()
    .withMessage("position must be a string"),
  body("experience.*.startDate")
    .notEmpty()
    .withMessage("startDate is required")
    .isString()
    .withMessage("startDate must be a string"),
  body("experience.*.endDate")
    .notEmpty()
    .withMessage("endDate is required")
    .isString()
    .withMessage("endDate must be a string"),
  body("experience.*.description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
];

