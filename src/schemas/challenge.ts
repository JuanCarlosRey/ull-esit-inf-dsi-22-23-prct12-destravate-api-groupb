import { ChallengeDocument } from "../interfaces/challenge.js";
import { Schema } from "mongoose";
import { Date } from "../interfaces/user.js";

export const ChallengeSchema = new Schema<ChallengeDocument>({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Challenge ID must be greater than 0");
      }
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tracks: [
    {
      type: Number,
      required: true,
    }
  ],
  type: {
    type: String,
    required: true,
    trim: true,
  },
  long: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Challenge long must be greater than 0");
      }
    },
  },
  users: [
    {
      type: Number,
      required: true,
    },
  ],
});
