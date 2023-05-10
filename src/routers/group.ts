import express from "express";
import { GroupModel } from "../models/group.js";

export const groupRouter = express.Router();

groupRouter.post("/groups", async (req, res) => {
  const group = new GroupModel(req.body);

  try {
    await group.save();
    return res.status(201).send(group);
  } catch (error) {
    return res.status(500).send(error);
  }
});

groupRouter.get("/groups", async (req, res) => {
  // Código
});

groupRouter.get("/groups/:id", async (req, res) => {
  // Código
});

groupRouter.patch("/groups", async (req, res) => {
  // Código
});

groupRouter.patch("/groups/:id", async (req, res) => {
  // Código
});

groupRouter.delete("/groups", async (req, res) => {
  // Código
});

groupRouter.delete("/groups/:id", async (req, res) => {
  // Código
});
