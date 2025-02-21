import { Request, Router } from "express";
import userRoutes from "./users/user.routes";
import educationRoutes from "./education/education.routes";
import experienceRoutes from "./experience/experience.routes";
import personalInfoRoutes from "./personal-info/personal-info.routes";
import resumeRoutes from "./resume/resume.routes";
import coverLetterRoutes from "./coverletter/coverletter.routes";
import upload from "./common/middleware/multer";
import { sendFile } from "./common/helper/sendFile";
import { createResponse } from "./common/helper/response.helper";

const router = Router();

router.use("/users", userRoutes);
router.use("/education", educationRoutes);
router.use("/experience", experienceRoutes);
router.use("/personal-info", personalInfoRoutes);
router.use("/resume", resumeRoutes);
router.use("/cover-letter", coverLetterRoutes);
router.post("/send-email", upload.single("file"), async (req, res) => {
  const { email, subject, html } = req.body;
  const file = req.file;

  console.log(req.body)
  console.log(file)

  if (!file) {
    throw new Error("Failed to file not found");
  }

  const filePath = file.path;
  const fileName = file.originalname;

  const result = await sendFile({
    email,
    subject,
    html,
    filePath,
    fileName,
  });

  if (result) {
    res.send(createResponse(result, "File Sent Successfully"));

  } else {

    throw new Error("Failed to send file");
  }
});

export default router;
