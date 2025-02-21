import { Router } from "express";
import * as PersonalInfoController from "./personal-info.controller";
import * as PersonalInfoValidation from "./personal-info.validation";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";

const router = Router();

router
  .get("/",PersonalInfoController.getAllPersonalInfo)
  .get("/:id", limiter, PersonalInfoController.getPersonalInfoById)
  .post(
    "/",
    limiter,
    PersonalInfoValidation.createPersonalInfo,
    catchError,
    PersonalInfoController.createPersonalInfo
  )
  .patch(
    "/:id",
    limiter,
    catchError,
    PersonalInfoController.updatePersonalInfo
  )
  .delete("/:id", limiter, PersonalInfoController.deletePersonalInfo);

export default router;
