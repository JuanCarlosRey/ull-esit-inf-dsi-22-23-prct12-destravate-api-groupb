import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces/user.js";
import validator from "validator";

const UserSchema = new Schema<UserDocument>({
  /**
   * El ID del usuario.
   */
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("User ID must be greater than 0");
      }
    },
  },
  /**
   * El nombre del usuario.
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * tipo de actividad que realiza el usuario.
   */
  activity: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Id de los amigos del usuario.
   */
  friends: [
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
   * Id de los grupos del usuario.
   */
  groups: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Group ID must be greater than 0");
        }
      },
    },
  ],
  /**
   * Estadísticas del usuario.
   */
  statistics: {
    _weekly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Distance must be greater than 0");
        }
      },
    },
    _weekly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Deviation must be greater than 0");
        }
      },
    },
    _monthly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Distance must be greater than 0");
        }
      },
    },
    _monthly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Deviation must be greater than 0");
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
  /**
   * Tracks favoritos del usuario.
   */
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
  /**
   * Retos completados por el usuario.
   */
  challenges: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Challenge ID must be greater than 0");
        }
      },
    },
  ],
  /**
   * Historial de tracks completados por el usuario.
   */
  history: [
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

export const UserModel = model<UserDocument>("User", UserSchema);

//example of a user
// {
//   "id": 1,
//   "name": "John Doe",
//   "activity": "running",
//   "friends": [2, 3, 4],
//   "groups": [1, 2],
//   "statistics": {
//     "_weekly_distance": 100,
//     "_weekly_deviation": 10,
//     "_monthly_distance": 200,
//     "_monthly_deviation": 20,
//     "_annual_distance": 300,
//     "_annual_deviation": 30
//   },
//  "favorite_tracks": [1, 2, 3],
//  "challenges": [1, 2, 3],
//  "history": [
//    {
//      "_id": 1,
//      "_date": "2021-10-10"
//   },
//   {
//      "_id": 2,
//      "_date": "2021-10-11"
//   }
//  ]
// }
