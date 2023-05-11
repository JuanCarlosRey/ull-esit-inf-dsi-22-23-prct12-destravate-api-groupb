import express from "express";
import { ChallengeModel } from "../models/challenge.js";

/**
 * constante que exporta un enrutador de Express para manejar solicitudes HTTP en una aplicación web.
 */
export const challengeRouter = express.Router();

/**
 *  metodo para crear un nuevo reto en la base de datos.
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
 * metodo para obtener un reto de la base de datos mediante su nombre
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
 * metodo para obtener un reto de la base de datos mediante su id.
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
 * metodo para actualizar un reto de la base de datos mediante su nombre.
 */
challengeRouter.patch("/challenges", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = [
    "id",
    "name",
    "tracks",
    "type",
    "long",
    "users"
  ];

  const isValidOperation = actualUpdates.every((update) =>
    allowedUpdates.includes(update)
  );

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
 * metodo para actualizar un reto de la base de datos mediante su id.
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
 * metodo para eliminar un reto de la base de datos mediante su nombre.
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
 * metodo para eliminar un reto de la base de datos mediante su id.
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