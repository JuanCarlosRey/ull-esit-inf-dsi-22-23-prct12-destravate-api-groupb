import { Schema, model } from "mongoose";
import { TrackDocument } from "../interfaces/track.js";

const TrackSchema = new Schema<TrackDocument>({
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
  name: {
    type: String,
    required: true,
    trim: true,
  },
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
  long: {
    type: Number,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track length must be greater than 0");
      }
    },
  },
  grade: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Grade of desviation must be greater than 0");
      }
    },
  },
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
  type: {
    type: String,
    required: true,
    trim: true,
  },
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