import express from "express";
import { TrackModel } from "../models/track.js";

export const trackRouter = express.Router();
/**

Route for creating a new track resource.
@name POST /tracks
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the new track if successful, or an error response if unsuccessful.
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

Route for retrieving track resources.
@name GET /tracks
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the requested tracks if successful, or an error response if unsuccessful.
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

Route for retrieving a specific track resource by ID.
@name GET /tracks/:id
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the requested track if successful, or an error response if unsuccessful.
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

Route for updating track resources.
@name PATCH /tracks
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the updated track if successful, or an error response if unsuccessful.
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

Updates a track by id

@method PATCH

@param {string} req.params.id - The id of the track to be updated.

@param {Object} req.body - The data to update the track with.

@returns {Object} The updated track.

@throws {Error} If there was an error updating the track.
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

Deletes a track by name
@method DELETE
@param {string} req.query.name - The name of the track to be deleted.
@returns {Object} The deleted track.
@throws {Error} If there was an error deleting the track.
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

Deletes a track by id
@method DELETE
@param {string} req.params.id - The id of the track to be deleted.
@returns {Object} The deleted track.
@throws {Error} If there was an error deleting the track.
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
