import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel"
import { protectedRequest } from "../../types/app-request"
import { NextFunction, Response } from "express"

const protect = asyncHandler(async (req: protectedRequest, res: Response, next: NextFunction) => {
  let token

  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }

      req.user = await User.findById(decoded.userId).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  } else {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

export { protect }
