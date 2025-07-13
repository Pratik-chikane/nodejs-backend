import { createLogger, format, transports } from "winston";
import { environment, logDir } from "../config";
import path from "path";
import fs from "fs";
import DailyRotateFile from "winston-daily-rotate-file";

let dir = logDir ?? "logs";

if (!dir) dir = path.resolve("logs");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = environment === "development" ? "debug" : "info";

// Console format based on environment
const consoleFormat =
  environment === "development"
    ? format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
          }`;
        })
      )
    : format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json()
      );

// File transport (only in production)
const fileTransports =
  environment === "production"
    ? [
        new DailyRotateFile({
          level: logLevel,
          filename: `${dir}/%DATE%-results.log`,
          datePattern: "YYYY-MM-DD",
          handleExceptions: true,
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          format: format.combine(
            format.errors({ stack: true }),
            format.timestamp(),
            format.json(),
            format.colorize()
          ),
        }),
      ]
    : [];

// Logger configuration
interface LoggerConfig {
  level: string;
  transports: any[];
  exitOnError: boolean;
  exceptionHandlers?: any[];
}

const loggerConfig: LoggerConfig = {
  level: logLevel,
  transports: [
    new transports.Console({
      level: logLevel,
      format: consoleFormat,
    }),
    ...fileTransports,
  ],
  exitOnError: false,
};

// Add exception handlers only in production
if (environment === "production") {
  loggerConfig.exceptionHandlers = fileTransports;
}

export default createLogger(loggerConfig);
