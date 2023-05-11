import express from "express";
import { TrackModel } from "../models/track.js";

/**
 * constante que exporta un enrutador de Express para manejar solicitudes HTTP en una aplicación web.
 */
export const trackRouter = express.Router();

/**
 * metodo para crear una nueva ruta en la base de datos.
 */
trackRouter.post("/tracks", async (req, res) => {
  const track = new TrackModel(req.body);

  try {
    await track.save();
    return res.status(201).send(track);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * metodo para obtener una ruta de la base de datos mediante su nombre
 */
trackRouter.get("/tracks", async (req, res) => {
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const tracks = await TrackModel.findOne(filter);
    if (tracks) {
      return res.send(tracks);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * metodo para obtener una ruta de la base de datos mediante su id.
 */
trackRouter.get("/tracks/:id", async (req, res) => {
  try {
    const tracks = await TrackModel.findOne({
      id: req.params.id,
    });
    if (tracks) {
      return res.send(tracks);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * metodo para actualizar una ruta de la base de datos mediante su nombre.
 */
trackRouter.patch("/tracks", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = [
    "id",
    "name",
    "start",
    "end",
    "long",
    "grade",
    "users",
    "type",
    "puntuation",
  ];

  const isValidUpdate = allowedUpdates.every((update) =>
    actualUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    const track = await TrackModel.findOneAndUpdate(
      { name: req.query.name.toString() },
      req.body,
      { new: true, runValidators: true }
    );

    if (track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * metodo para actualizar una ruta de la base de datos mediante su id.
 */
trackRouter.patch("/tracks/:id", async (req, res) => {
  try {
    const track = await TrackModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (track) {
      return res.send(track);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * metodo para eliminar una ruta de la base de datos mediante su nombre.
 */
trackRouter.delete("/tracks", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const track = await TrackModel.findOneAndDelete({
      name: req.query.name,
    });
    if (track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * metodo para eliminar una ruta de la base de datos mediante su id.
 */
trackRouter.delete("/tracks/:id", async (req, res) => {
  try {
    const track = await TrackModel.findOneAndDelete({
      id: req.params.id,
    });
    if (track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});