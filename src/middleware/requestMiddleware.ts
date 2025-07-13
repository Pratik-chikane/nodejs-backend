import { NextFunction, Request, Response } from "express";
import logger from "../core/logger";
import { v4 as uuidv4 } from "uuid"

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export const RequestResponseLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = (req.headers['x-request-id'] as string) || uuidv4();
  const startTime = process.hrtime.bigint();

  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  logger.defaultMeta = { requestId };

  logger.info('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const durationMs = Number((endTime - startTime) / BigInt(1_000_000)).toFixed(2);

    logger.info('Completed request', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: `${durationMs}ms`,
    });
  });

  next();
};