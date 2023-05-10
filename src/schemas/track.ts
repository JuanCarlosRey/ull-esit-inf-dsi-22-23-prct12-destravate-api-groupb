import { Schema } from "mongoose";
import { TrackDocument } from "../interfaces/track.js";

export const TrackSchema = new Schema<TrackDocument>({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track ID must be greater than 0");
      }
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  start: {
    type: String,
    required: true,
    trim: true
  },
  end: {
    type: String,
    required: true,
    trim: true
  },
  long: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track long must be greater than 0");
      }
    }
  },
  grade: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track grade must be greater than 0");
      }
    }
  },
  users: [
    {
      type: Number,
      required: true
    }
  ],
  type: {
    type: String,
    required: true,
    trim: true
  },
  puntuation: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track puntuation must be greater than 0");
      }

      if (value > 10) {
        throw new Error("Track puntuation must be less than 10");
      }
    }
  }
});