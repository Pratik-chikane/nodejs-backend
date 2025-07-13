import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel";
import { protectedRequest } from "../../types/app-request";
import { Response } from "express";
import logger from "../core/logger";
import {
  BadRequestError,
  ForbiddenError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from "../core/CustomError";

const createTodo = asyncHandler(
  async (req: protectedRequest, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user

    if (!title || !description) {
      throw new BadRequestError("Title and Description are required!");
    }

    try {
      const todo = await Todo.create({ user: req.user, title, description });
      logger.info("Todo created successfully", {
        userId,
        todoId: todo._id,
        title,
      });

      res.status(201).json({ title, description });
    } catch (error) {
      throw new InternalError("Failed to create todo");
    }
  }
);

const getTodos = asyncHandler(async (req: protectedRequest, res: Response) => {
  const userId = req.user._id;
  try {
    const todos = await Todo.find({ user: userId });
    logger.info("Todos fetched successfully", {
      userId,
      count: todos.length,
    });

    res.json(todos);
  } catch (error) {
    throw new InternalError("Failed to fetch todos.");
  }
});

const editTodo = asyncHandler(async (req: protectedRequest, res: Response) => {
  const { title, description, status } = req.body;
  const userId = req.user._id;
  const todoId = req.params.id;

  if (!title || !description || !status)
    throw new BadRequestError("Title, Description, and Status are required");

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) throw new NotFoundError("Todo not found");

    if (todo.user.toString() !== userId.toString())
      throw new ForbiddenError("Not authorized to update this todo");

    todo.title = title;
    todo.description = description;
    todo.status = status;

    const updatedTodo = await todo.save();
    logger.info("Todo updated successfully", {
      userId,
      todoId
    });

    res.json(updatedTodo);
  } catch (error) {
    throw new InternalError("Failed to update todo");
  }
});

const deleteTodo = asyncHandler(
  async (req: protectedRequest, res: Response) => {
    const userId = req.user._id;
    const todoId = req.params.id;

    try {
      const todo = await Todo.findById(todoId);
      if (!todo) throw new NotFoundError("Todo not found");

      // Add authorization check for delete
      if (todo.user.toString() !== userId.toString())
        throw new UnauthorizedError("Not authorized to delete this todo");

      await todo.deleteOne();

      logger.info("Todo deleted successfully", {
        userId,
        todoId,
      });
      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      throw new InternalError("Failed to delete todo");
    }
  }
);

export { createTodo, getTodos, editTodo, deleteTodo };
