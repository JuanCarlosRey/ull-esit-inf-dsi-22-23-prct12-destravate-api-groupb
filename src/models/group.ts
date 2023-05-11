import { Schema, model } from "mongoose";
import { GroupDocument } from "../interfaces/group.js";
import validator from "validator";

/**
 * Esquema para un Grupo en la aplicación.
 * @typedef {Object} GroupSchema
 * @property {number} id - ID del grupo.
 * @property {string} name - Nombre del grupo.
 * @property {Array<number>} members - IDs de los miembros del grupo.
 * @property {Object} global_stadistics - Estadísticas globales del grupo.
 * @property {number} global_stadistics._weekly_distance - Distancia semanal total del grupo.
 * @property {number} global_stadistics._weekly_deviation - Desviación semanal total del grupo.
 * @property {number} global_stadistics._monthly_distance - Distancia mensual total del grupo.
 * @property {number} global_stadistics._monthly_deviation - Desviación mensual total del grupo.
 * @property {number} global_stadistics._annual_distance - Distancia anual total del grupo.
 * @property {number} global_stadistics._annual_deviation - Desviación anual total del grupo.
 * @property {Array<number>} ranking - IDs de los usuarios en el ranking del grupo.
 * @property {Array<number>} favorite_tracks - IDs de las pistas favoritas del grupo.
 * @property {Array<Object>} group_history - Historial de pistas del grupo.
 * @property {number} group_history._id - ID de la pista.
 * @property {string} group_history._date - Fecha de la pista en formato "YYYY-MM-DD".
 */
const GroupSchema = new Schema<GroupDocument>({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("El ID del grupo debe ser mayor que 0");
      }
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: [
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
  global_stadistics: {
    _weekly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La distancia debe ser mayor que 0");
        }
      },
    },
    _weekly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La desviación debe ser mayor que 0");
        }
      },
    },
    _monthly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La distancia debe ser mayor que 0");
        }
      },
    },
    _monthly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La desviación debe ser mayor que 0");
        }
      },
    },
    _annual_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Distance must be greater than 0");
        }
      },
    },
    _annual_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Deviation must be greater than 0");
        }
      },
    },
  },
  ranking: [
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
  favorite_tracks: [
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
  group_history: [
    {
      _id: {
        type: Number,
        required: true,
        validate(value: number) {
          if (value < 0) {
            throw new Error("Track ID must be greater than 0");
          }
        },
      },
      _date: {
        type: String,
        required: true,
        validate(value: string) {
          if (!validator.default.isDate(value)) {
            throw new Error("Date is invalid");
          }
        },
      },
    },
  ],
});

export const GroupModel = model<GroupDocument>("Group", GroupSchema);

//example of a group
// {
//   "id": 1,
//   "name": "Grupo 1",
//   "members": [1, 2, 3, 4, 5],
//   "global_stadistics": {
//     "_weekly_distance": 123,
//     "_weekly_deviation": 123,
//     "_monthly_distance": 123,
//     "_monthly_deviation": 123,
//     "_annual_distance": 123,
//     "_annual_deviation": 123
//   },
//   "ranking": [1, 2, 3, 4, 5],
//   "favorite_tracks": [1, 2, 3, 4, 5],
//   "group_history": [
//     {
//       "_id": 1,
//       "_date": "2021-10-10"
//     },
//     {
//       "_id": 2,
//       "_date": "2021-10-10"
//     },
//   ]
// }
