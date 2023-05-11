import { Schema, model } from "mongoose";
import { TrackDocument } from "../interfaces/track.js";

/**
 * Esquema de Mongoose para una pista
 */

const TrackSchema = new Schema<TrackDocument>({
  /**
   * El ID de la pista.
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
   * Nombre de la pista.
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Inicio de la pista
   */
  start: {
    lat: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Latitude must be greater than 0");
        }
      },
    },
    long: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Length must be greater than 0");
        }
      },
    },
    alt: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Altitude must be greater than 0");
        }
      },
    },
  },
  /**
   * Final de la pista.
   */
  end: {
    lat: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Latitude must be greater than 0");
        }
      },
    },
    long: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Length must be greater than 0");
        }
      },
    },
    alt: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Altitude must be greater than 0");
        }
      },
    },
  },
  /**
   * Longitud de la pista en metros.
   */
  long: {
    type: Number,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track length must be greater than 0");
      }
    },
  },
  /**
   * Desviación de la pista en grados.
   */
  grade: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Grade of desviation must be greater than 0");
      }
    },
  },
  /**
   * Usuarios que han completado la pista.
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
  /**
   * Tipo de pista.
   */
  type: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Puntuación de la pista.
   */
  puntuation: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0 || value > 5) {
        throw new Error("Puntuation must be a number between 0 and 5");
      }
    },
  },
});

export const TrackModel = model<TrackDocument>("Track", TrackSchema);

// example of a track
// {
//   "id": 1,
//   "name": "Track 1",
//   "start": {
//     "lat": 28.123,
//     "long": 16.123,
//     "alt": 123
//   },
//   "end": {
//     "lat": 28.123,
//     "long": 16.123,
//     "alt": 123
//   },
//   "long": 123,
//   "grade": 123,
//   "users": [1, 2, 3],
//   "type": "running",
//   "puntuation": 4
// }
