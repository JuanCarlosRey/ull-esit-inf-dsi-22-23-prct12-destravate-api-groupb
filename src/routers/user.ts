//sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/
/**

Router para manejar usuarios
@class
@typedef {import('express').Router} Router
@property {Router} userRouter - Router para manejar usuarios
*/
import express from "express";
import { UserModel } from "../models/user.js";

export const userRouter = express.Router();
/**

Crea un usuario nuevo
@name POST/users
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {Object} req.body - Objeto que contiene los datos del usuario
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene los datos del usuario creado
*/
userRouter.post("/users", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Obtiene la información de todos los usuarios o de un usuario en particular
@name GET/users
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {String} [req.query.name] - Nombre del usuario que se desea obtener
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene la información del usuario o usuarios
*/
userRouter.get("/users", async (req, res) => {
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const users = await UserModel.findOne(filter);
    if (users) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Obtiene la información de un usuario en particular
@name GET/users/:id
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {String} req.params.id - ID del usuario que se desea obtener
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene la información del usuario
*/
userRouter.get("/users/:id", async (req, res) => {
  try {
    const users = await UserModel.findOne({
      id: req.params.id,
    });
    if (users) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Actualiza los datos de un usuario
@name PATCH/users
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {String} [req.query.name] - Nombre del usuario que se desea actualizar
@param {Object} req.body - Objeto que contiene los nuevos datos del usuario
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene la información del usuario actualizado
*/
userRouter.patch("/users", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = [
    "id",
    "name",
    "activity",
    "friends",
    "groups",
    "statistics",
    "favorite_tracks",
    "challenges",
    "history",
  ];

  const isValidOperation = actualUpdates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      {
        name: req.query.name.toString(),
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Patch a user with a given id.

@route PATCH /users/{id}

@param {string} id.path.required - The id of the user to patch.

@body {object} user - The updated user object.

@returns {object} 200 - The updated user.

@returns {Error} 404 - The user was not found.

@returns {Error} 500 - An error occurred while updating the user.
*/
userRouter.patch("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Delete a user with a given name.
@route DELETE /users
@queryparam {string} name - The name of the user to delete.
@returns {object} 200 - The deleted user.
@returns {Error} 400 - No name provided.
@returns {Error} 404 - The user was not found.
@returns {Error} 500 - An error occurred while deleting the user.
*/
userRouter.delete("/users", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const user = await UserModel.findOneAndDelete({
      name: req.query.name,
    });
    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Delete a user with a given id.
@route DELETE /users/{id}
@param {string} id.path.required - The id of the user to delete.
@returns {object} 200 - The deleted user.
@returns {Error} 404 - The user was not found.
@returns {Error} 500 - An error occurred while deleting the user.
*/
userRouter.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({
      id: req.params.id,
    });
    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
