import { Router } from "express";
import * as ExperienceController from "./experience.controller";
import * as ExperienceValidation from "./experience.validation";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";

const router = Router();

router
  .get("/", roleAuth(["ADMIN"]), ExperienceController.getAllExperience)
  .get("/:id", limiter, ExperienceController.getExperienceById)
  .post(
    "/",
    limiter,
    ExperienceValidation.createExperience,
    catchError,
    ExperienceController.createExperience
  )
  .patch(
    "/:id",
    limiter,
    catchError,
    ExperienceController.updateExperience
  )
  .delete("/:id", limiter, ExperienceController.deleteExperience);

export default router;
