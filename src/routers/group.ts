
/**

Module for handling routes related to groups
@module groupRouter
*/
import express from "express";
import { GroupModel } from "../models/group.js";

/** Express router for groups */
export const groupRouter = express.Router();
/**

Route for creating a new group
@name post/groups
@function
@memberof module:groupRouter
@param {Object} req - Express request object
@param {Object} req.body - Request body containing the group's data
@param {string} req.body.name - The name of the group
@param {Array} req.body.members - An array of user IDs representing members of the group
@param {Object} req.body.global_statistics - An object containing global statistics for the group
@param {Array} req.body.ranking - An array of user IDs representing the group's ranking
@param {Array} req.body.favorite_tracks - An array of track IDs representing the group's favorite tracks
@param {Array} req.body.group_history - An array of objects representing the group's history
@param {Object} res - Express response object
@returns {Object} Returns the newly created group or an error
@throws {Error} Throws an error if the group creation fails
*/
groupRouter.post("/groups", async (req, res) => {
  const group = new GroupModel(req.body);

  try {
    await group.save();
    return res.status(201).send(group);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Route for finding a group or groups by name
@name get/groups
@function
@memberof module:groupRouter
@param {Object} req - Express request object
@param {string} req.query.name - The name of the group to find
@param {Object} res - Express response object
@returns {Object} Returns the found group or groups or an error
@throws {Error} Throws an error if the find operation fails
*/
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
/**

Route for finding a group by ID
@name get/groups/:id
@function
@memberof module:groupRouter
@param {Object} req - Express request object
@param {string} req.params.id - The ID of the group to find
@param {Object} res - Express response object
@returns {Object} Returns the found group or an error
@throws {Error} Throws an error if the find operation fails
*/
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
/**
 * @route PATCH /groups
 * @group Groups - Operaciones CRUD para grupos
 * @param {string} name.query.required - Nombre del grupo a actualizar.
 * @param {Group.model} body.required - Información actualizada del grupo.
 * @returns {Group.model} 200 - Grupo actualizado.
 * @returns {Error} 400 - No se proporcionó el nombre del grupo.
 * @returns {Error} 400 - Actualizaciones inválidas.
 * @returns {Error} 404 - No se encontró el grupo especificado.
 * @returns {Error} 500 - Error interno del servidor.
 */
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

/**
 * @route PATCH /groups/:id
 * @group Groups - Operaciones CRUD para grupos
 * @param {string} id.path.required - Identificador del grupo a actualizar.
 * @param {Group.model} body.required - Información actualizada del grupo.
 * @returns {Group.model} 200 - Grupo actualizado.
 * @returns {Error} 404 - No se encontró el grupo especificado.
 * @returns {Error} 500 - Error interno del servidor.
 */
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
/**

Deletes a group by its name
@route DELETE /groups
@param {string} name.query.required - name of the group to delete
@returns {Object} 200 - Deleted group
@returns {Object} 404 - Group not found
@returns {Error} 400 - Bad request
@returns {Error} 500 - Internal server error
*/
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
/**

Deletes a group by its id
@route DELETE /groups/{id}
@param {string} id.path.required - id of the group to delete
@returns {Object} 200 - Deleted group
@returns {Object} 404 - Group not found
@returns {Error} 500 - Internal server error
*/
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
