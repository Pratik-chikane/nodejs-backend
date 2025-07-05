import dotenv from "dotenv"

dotenv.config()

export const environment = process.env.NODE_ENV
export const port = process.env.PORT
export const databaseUrl = process.env.DATABASE_URL
export const corsUrl = process.env.CORS_URL
