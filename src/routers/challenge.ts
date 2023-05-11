import express from "express";
import { ChallengeModel } from "../models/challenge.js";

/**
 * Express Router for challenges
 */
export const challengeRouter = express.Router();
/**
 * Create a new challenge
 * @param req - Express request object
 * @param res - Express response object
 * @returns The created challenge
 */
challengeRouter.post("/challenges", async (req, res) => {
  const challenge = new ChallengeModel(req.body);

  try {
    await challenge.save();
    return res.status(201).send(challenge);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Get challenges that match a filter
 * @param req - Express request object
 * @param res - Express response object
 * @returns Challenges that match the filter
 */
challengeRouter.get("/challenges", async (req, res) => {
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const challenges = await ChallengeModel.findOne(filter);
    if (challenges) {
      return res.send(challenges);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Get a challenge by ID
 * @param req - Express request object
 * @param res - Express response object
 * @returns The challenge that matches the ID
 */
challengeRouter.get("/challenges/:id", async (req, res) => {
  try {
    const challenges = await ChallengeModel.findOne({
      id: req.params.id,
    });
    if (challenges) {
      return res.send(challenges);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Update a challenge by name
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated challenge
 */
challengeRouter.patch("/challenges", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = ["id", "name", "tracks", "type", "long", "users"];

  const isValidOperation = actualUpdates.every((update) => {
    allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const challenge = await ChallengeModel.findOneAndUpdate(
      {
        name: req.query.name.toString(),
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (challenge) {
      return res.send(challenge);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Update a challenge by ID
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated challenge
 */
challengeRouter.patch("/challenges/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
/**

Maneja las solicitudes para eliminar un desafío por su nombre.
@function
@async
@param {Object} req - Objeto de solicitud Express.
@param {Object} res - Objeto de respuesta Express.
@returns {Object} Objeto del desafío eliminado.
@throws {Error} Error de servidor interno.
*/
challengeRouter.delete("/challenges", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const challenge = await ChallengeModel.findOneAndDelete({
      name: req.query.name,
    });
    if (challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Maneja las solicitudes para eliminar un desafío por su ID.
@function
@async
@param {Object} req - Objeto de solicitud Express.
@param {Object} res - Objeto de respuesta Express.
@returns {Object} Objeto del desafío eliminado.
@throws {Error} Error de servidor interno.
*/
challengeRouter.delete("/challenges/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findOneAndDelete({
      id: req.params.id,
    });
    if (challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
