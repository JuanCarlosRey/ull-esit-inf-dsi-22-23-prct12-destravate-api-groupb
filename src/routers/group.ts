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
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const groups = await GroupModel.findOne(filter);
    if(groups) {
      return res.send(groups);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

groupRouter.get("/groups/:id", async (req, res) => {
  try {
    const groups = await GroupModel.find({
      id: req.params.id
    });
    if(groups) {
      return res.send(groups);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
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
