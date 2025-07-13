import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import todoRoutes from "./routes/todoRoutes"
import userRoutes from "./routes/userRoutes"
import { corsUrl } from "./config"
import { NotFoundError } from "./core/CustomError"

import { errorHandler } from "./middleware/errorMiddleware"
import { RequestResponseLogger } from "./middleware/requestMiddleware"

export const app = express();

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(RequestResponseLogger);

app.use("/api/users", userRoutes)
app.use("/api/todo", todoRoutes)


app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
});

app.use(errorHandler);
