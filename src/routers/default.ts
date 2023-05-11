/**
 * @fileoverview Define el enrutador por defecto que maneja todas las peticiones no encontradas
 * @module DefaultRouter
 */

import express, { Request, Response } from "express";

/** Define el enrutador por defecto */
export const defaultRouter = express.Router();

/**
 * Maneja todas las peticiones no encontradas y devuelve un estado 501
 * @name all/*
 * @function
 * @memberof module:DefaultRouter
 * @param {Request} req - Objeto de solicitud de Express
 * @param {Response} res - Objeto de respuesta de Express
 */
defaultRouter.all("*", (req: Request, res: Response) => {
  res.status(501).send();
});
