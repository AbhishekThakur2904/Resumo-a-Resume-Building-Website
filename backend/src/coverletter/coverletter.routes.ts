import { Router } from "express";
import * as CoverLetterValidation from "./coverletter.validation";
import * as CoverLetterController from "./coverletter.controller";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";
const router = Router();

router
  .get("/", CoverLetterController.getAllCoverLetter)
  .get("/my", roleAuth(["USER"]), CoverLetterController.getCoverLetterByUserId)
  .get("/:id", CoverLetterController.getCoverLetterById)
  .post(
    "/",
    limiter,
    CoverLetterValidation.createCoverLetter,
    catchError,
    CoverLetterController.createCoverLetter
  )
  .patch("/:id", limiter, catchError, CoverLetterController.updateCoverLetter)
  .delete("/:id", limiter, CoverLetterController.deleteCoverLetter);

export default router;
