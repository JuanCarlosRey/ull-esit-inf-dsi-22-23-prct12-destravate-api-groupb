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
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const users = await UserModel.findOne(filter);
    if(users) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const users = await UserModel.findOne({
      id: req.params.id
    });
    if(users) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

userRouter.patch("/users", async (req, res) => {
  // Código
});

userRouter.patch("/users/:id", async (req, res) => {
  // Código
});

userRouter.delete("/users", async (req, res) => {
  if(!req.query.name) {
    return res.status(400).send();
  }
  try {
    const user = await UserModel.findOneAndDelete({
      name: req.query.name
    });
    if(user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({
      id: req.params.id
    });
    if(user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});
