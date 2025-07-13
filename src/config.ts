import dotenv from "dotenv"

dotenv.config()

export const environment = process.env.NODE_ENV
export const port = process.env.PORT
export const databaseUrl = process.env.DATABASE_URL
export const corsUrl = process.env.CORS_URL
export const logDir = process.env.LOG_DIR
export const minPoolSize = parseInt(process.env.MIN_POOL_SIZE || '5')
export const maxPoolSize = parseInt(process.env.MAX_POOL_SIZE || '10')
