
import { app } from "./app"
import { port } from "./config"
import logger from "./core/logger"


app.listen(port || 8081, () => {
  logger.info(`Server is running on port ${port || 8081}`)
})
