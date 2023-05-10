import express from "express";
import { TrackModel } from "../models/track.js";

export const trackRouter = express.Router();

trackRouter.post("/tracks", async (req, res) => {
  const track = new TrackModel(req.body);

  try {
    await track.save();
    return res.status(201).send(track);
  } catch (error) {
    return res.status(500).send(error);
  }
});

trackRouter.get("/tracks", async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const tracks = await TrackModel.findOne(filter);
    if(tracks) {
      return res.send(tracks);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

trackRouter.get("/tracks/:id", async (req, res) => {
  try {
    const tracks = await TrackModel.findOne({
      id: req.params.id
    });
    if(tracks) {
      return res.send(tracks);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

trackRouter.patch("/tracks", async (req, res) => {
  // Código
});

trackRouter.patch("/tracks/:id", async (req, res) => {
  // Código
});

trackRouter.delete("/tracks", async (req, res) => {
  if(!req.query.name) {
    return res.status(400).send();
  }
  try {
    const track = await TrackModel.findOneAndDelete({
      name: req.query.name
    });
    if(track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

trackRouter.delete("/tracks/:id", async (req, res) => {
  try {
    const track = await TrackModel.findOneAndDelete({
      id: req.params.id
    });
    if(track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});
