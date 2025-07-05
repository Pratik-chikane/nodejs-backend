import mongoose from "mongoose"
import { databaseUrl } from "../config"

mongoose
  .connect(databaseUrl as string)
  .then(() => "MongoDB Connected")
  .catch(err => console.log(err))
