import { Router } from "express";
import * as ResumeValidation from "./resume.validation";
import * as ResumeController from "./resume.controller";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";
const router = Router();

router
  .get("/", ResumeController.getAllResume)
  .get("/my", roleAuth(["USER", "ADMIN"]), ResumeController.getResumeByUserId)
  .get("/:id", ResumeController.getResumeById)
  .post(
    "/",
    limiter,
    roleAuth(["USER", "ADMIN"]),
    ResumeValidation.createResume,
    catchError,
    ResumeController.createResume
  )
  .patch("/:id", limiter, catchError, ResumeController.updateResume)
  .delete("/:id", limiter, ResumeController.deleteResume);

export default router;
