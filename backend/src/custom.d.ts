import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can replace `any` with your actual user type
  }
}
