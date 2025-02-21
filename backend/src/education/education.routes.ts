import { Router } from "express";
import * as EducationController from "./education.controller";
import * as EducationValidation from "./education.validation";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";

const router = Router();

router
  .get("/", roleAuth(["ADMIN"]), EducationController.getAllEducation)
  .post(
    "/",
    limiter,
    EducationValidation.createEducation,
    catchError,
    EducationController.createEducation
  )
  .patch(
    "/:id",
    limiter,
    catchError,
    EducationController.updateEducation
  )
  .delete("/:id", limiter, EducationController.deleteEducation);

export default router;
