import express from "express";
import { ChallengeModel } from "../models/challenge.js";

export const challengeRouter = express.Router();

challengeRouter.post("/challenges", async (req, res) => {
  const challenge = new ChallengeModel(req.body);

  try {
    await challenge.save();
    return res.status(201).send(challenge);
  } catch (error) {
    return res.status(500).send(error);
  }
});

challengeRouter.get("/challenges", async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const challenges = await ChallengeModel.findOne(filter);
    if(challenges) {
      return res.send(challenges);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

challengeRouter.get("/challenges/:id", async (req, res) => {
  try {
    const challenges = await ChallengeModel.findOne({
      id: req.params.id
    });
    if(challenges) {
      return res.send(challenges);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

challengeRouter.patch("/challenges", async (req, res) => {
  // Código
});

challengeRouter.patch("/challenges/:id", async (req, res) => {
  // Código
});

challengeRouter.delete("/challenges", async (req, res) => {
  if(!req.query.name) {
    return res.status(400).send();
  }
  try {
    const challenge = await ChallengeModel.findOneAndDelete({
      name: req.query.name
    });
    if(challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});

challengeRouter.delete("/challenges/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findOneAndDelete({
      id: req.params.id
    });
    if(challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch(error) {
    return res.status(500).send(error);
  }
});
