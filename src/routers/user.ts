import express from "express";
import { UserModel } from "../models/user.js";

export const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

userRouter.get("/users", async (req, res) => {
  // Código
});

userRouter.get("/users/:id", async (req, res) => {
  // Código
});

userRouter.patch("/users", async (req, res) => {
  // Código
});

userRouter.patch("/users/:id", async (req, res) => {
  // Código
});

userRouter.delete("/users", async (req, res) => {
  // Código
});

userRouter.delete("/users/:id", async (req, res) => {
  // Código
});
