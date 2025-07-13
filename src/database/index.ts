import mongoose from "mongoose";
import { databaseUrl, maxPoolSize, minPoolSize } from "../config";
import Logger from "../core/logger";

const options = {
  minPoolSize,
  maxPoolSize,
  connectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

function setRunValidators() {
  return { runValidators: true };
}

mongoose.set("strictQuery", true);

mongoose
  .plugin((schema) => {
    schema.pre("updateMany", setRunValidators),
      schema.pre("updateOne", setRunValidators),
      schema.pre("findOneAndUpdate", setRunValidators);
  })
  .connect(databaseUrl as string, options)
  .then(() => Logger.info("Mongoose connection succesfull"))
  .catch((err) => Logger.error("Mongoose connection error", { stack: err }));

mongoose.connection.on("connected", () => {
  Logger.info("Mongoose connection is open");
});

mongoose.connection.on("disconnected", () => {
  Logger.error("Mongoose connection is disconnected");
});

mongoose.connection.on("error", () => {
  Logger.error("Mongoose connection error");
});

process.on("SIGINT", () => {
  mongoose.connection.close().finally(() => {
    Logger.info("Mongoose connection close through app termination");
  });
  process.exit(0);
});

export const connection = mongoose.connection;
