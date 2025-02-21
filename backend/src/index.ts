import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import { initDB } from "./common/services/database.service";
import errorHandler from "./common/middleware/error-handler.middleware";
import routes from "./routes";
import { config } from "dotenv";
import cookieParser = require("cookie-parser");
import { IUser } from "./users/user.dto";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger";
import cors from "cors";
import { limiter } from "./common/helper/rate-limiter";
config();
const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}
declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}

const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();
  //rate limiter
  app.use(limiter);
  //route
  app.use("/api", routes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

  // error handler
  app.use(errorHandler);
  http.createServer(app).listen(port, () => {
    console.log("Server is running on port", port);
  });
};

void initApp();
