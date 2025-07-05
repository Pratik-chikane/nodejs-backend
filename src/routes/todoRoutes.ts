import express from "express"
import { protect } from "../middleware/authMiddleware"
import { createTodo, deleteTodo, editTodo, getTodos } from "../controllers/todoController"

const todoRoutes = express.Router()

todoRoutes.route("/").post(protect, createTodo).get(protect, getTodos)
todoRoutes.route("/:id").put(protect, editTodo).delete(protect, deleteTodo)

export default todoRoutes
