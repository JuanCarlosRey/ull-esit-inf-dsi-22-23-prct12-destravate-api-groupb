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
    },
    long: {
      type: Number,
      required: true,
    },
    alt: {
      type: Number,
      required: true,
    },
  },
  end: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    alt: {
      type: Number,
      required: true,
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
  },
});

export const TrackModel = model<TrackDocument>("Track", TrackSchema);
