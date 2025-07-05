import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/userController"

const userRoutes = express.Router()

userRoutes.route("/login").post(loginUser)
userRoutes.route("/register").post(registerUser)
userRoutes.route("/logout").get(logoutUser)

export default userRoutes;
