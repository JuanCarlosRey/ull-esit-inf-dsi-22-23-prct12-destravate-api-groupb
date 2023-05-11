import { Schema, model } from "mongoose";
import { ChallengeDocument } from "../interfaces/challenge.js";

/**
 * Esquema de Mongoose para el modelo de desafío.
 * @category Desafío
 */
const ChallengeSchema = new Schema<ChallengeDocument>({
  /**
   * Identificador único del desafío.
   */
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("El ID del desafío debe ser mayor que 0");
      }
    },
  },
  /**
   * Nombre del desafío.
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Lista de identificadores de las pistas asociadas al desafío.
   */
  tracks: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("El ID de la pista debe ser mayor que 0");
        }
      },
    },
  ],
  /**
   * Tipo de desafío.
   */
  type: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Longitud total de las pistas asociadas al desafío.
   */
  long: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("La longitud de la pista debe ser mayor que 0");
      }
    },
  },
  /**
   * Lista de identificadores de los usuarios que participan en el desafío.
   */
  users: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("El ID del usuario debe ser mayor que 0");
        }
      },
    },
  ],
});

/**
 * Modelo de Mongoose para el desafío.
 * @category Desafío
 */
export const ChallengeModel = model<ChallengeDocument>(
  "Challenge",
  ChallengeSchema
);


//example of a challenge
// {
//   "id": 1,
//   "name": "Challenge 1",
//   "tracks": [1, 2, 3],
//   "type": "challenge",
//   "long": 100,
//   "users": [1, 2, 3]
// }
