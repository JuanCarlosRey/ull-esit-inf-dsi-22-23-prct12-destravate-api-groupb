import { Schema, model } from "mongoose";
import { ChallengeDocument } from "../interfaces/challenge.js";

/**
 * Challenge schema
 */
const ChallengeSchema = new Schema<ChallengeDocument>({
  /**
   * El ID del reto.
   */
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track ID must be greater than 0");
      }
    },
  },
  /**
   * Nombre del reto.
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Descripción del reto.
   */
  tracks: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Track ID must be greater than 0");
        }
      },
    },
  ],
  /**
   * Tipo de reto.
   */
  type: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Longitud del reto en metros.
   */
  long: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track length must be greater than 0");
      }
    },
  },
  /**
   * Usuarios que han completado el reto.
   */
  users: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("User ID must be greater than 0");
        }
      },
    },
  ],
});

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