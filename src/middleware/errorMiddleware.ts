import { NextFunction, Request, Response } from "express"
import { ApiError, ErrorTypes } from "../core/ApiError";
import { InternalError } from "../core/CustomError";
import logger from "../core/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    const level = err.type === ErrorTypes.INTERNAL ? 'error' : 'warn';
    logger[level](err.message, { url: req.originalUrl, method: req.method, ip: req.ip, stack: err.stack });
    return;
  }
  ApiError.handle(new InternalError(), res);
  logger.error(err.message, { url: req.originalUrl, method: req.method, ip: req.ip, stack: err.stack });
}
