//sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/
import express from "express";
import { UserModel } from "../models/user.js";

/**
 * constante que exporta un enrutador de Express para manejar solicitudes HTTP en una aplicación web.
 */
export const userRouter = express.Router();

/**
 * metodo para crear un nuevo usuario en la base de datos.
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
 * metodo para obtener un usuario de la base de datos mediante su nombre
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
 * metodo para obtener un usuario de la base de datos mediante su id.
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
 * metodo para actualizar un usuario de la base de datos mediante su nombre.
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
 * metodo para actualizar un usuario de la base de datos mediante su id.
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
 * metodo para eliminar un usuario de la base de datos mediante su nombre.
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
 * metodo para eliminar un usuario de la base de datos mediante su id.
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