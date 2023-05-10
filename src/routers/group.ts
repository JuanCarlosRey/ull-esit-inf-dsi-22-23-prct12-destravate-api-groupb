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
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const groups = await GroupModel.findOne(filter);
    if (groups) {
      return res.send(groups);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

groupRouter.get("/groups/:id", async (req, res) => {
  try {
    const groups = await GroupModel.find({
      id: req.params.id,
    });
    if (groups) {
      return res.send(groups);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

groupRouter.patch("/groups", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = [
    "id",
    "name",
    "members",
    "global_stadistics",
    "ranking",
    "favorite_tracks",
    "group_history",
  ];

  const isValidOperation = actualUpdates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const group = await GroupModel.findOneAndUpdate(
      { name: req.query.name.toString() },
      req.body,
      { new: true, runValidators: true }
    );

    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

groupRouter.patch("/groups/:id", async (req, res) => {
  try {
    const group = await GroupModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

groupRouter.delete("/groups", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const group = await GroupModel.findOneAndDelete({
      name: req.query.name,
    });
    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

groupRouter.delete("/groups/:id", async (req, res) => {
  try {
    const group = await GroupModel.findOneAndDelete({
      id: req.params.id,
    });
    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
