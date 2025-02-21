import userRoute from "./userRoutes.json";
import resumeRoutes from "./resumeRoutes.json";
import personalRoutes from "./personalRoutes.json";
import experienceRoutes from "./experienceRoutes.json";
import educationRoutes from "./educationRoutes.json";
import coverLetterRoutes from "./coverLetterRoutes.json";
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Backend API Documentation",
    version: "1.0.0",
    description: "API documentation for the Resume Builder Application",
    contact: {
      email: "zeeshan.75way@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
  ],
  paths: {
    ...userRoute,
    ...resumeRoutes,
    ...personalRoutes,
    ...experienceRoutes,
    ...educationRoutes,
    ...coverLetterRoutes,
  },
};

export default swaggerDocument;
