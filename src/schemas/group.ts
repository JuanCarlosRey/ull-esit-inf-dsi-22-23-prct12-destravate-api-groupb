import { Schema } from "mongoose";
import { GroupDocument } from "../interfaces/group.js";

const GroupSchema = new Schema<GroupDocument>({
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
  members: [
    {
      type: Number,
      required: true,
    },
  ],
  global_stadistics: {
    _weekly_distance: {
      type: Number,
      required: true,
    },
    _weekly_deviation: {
      type: Number,
      required: true,
    },
    _monthly_distance: {
      type: Number,
      required: true,
    },
    _monthly_deviation: {
      type: Number,
      required: true,
    },
    _annual_distance: {
      type: Number,
      required: true,
    },
    _annual_deviation: {
      type: Number,
      required: true,
    },
  },
  ranking: [
    {
      type: Number,
      required: true,
    },
  ],
  favorite_tracks: [
    {
      type: Number,
      required: true,
    },
  ],

  group_history: {
    _weekly_distance: {
      type: Number,
      required: true,
    },
    _weekly_deviation: {
      type: Number,
      required: true,
    },
    _monthly_distance: {
      type: Number,
      required: true,
    },
    _monthly_deviation: {
      type: Number,
      required: true,
    },
    _annual_distance: {
      type: Number,
      required: true,
    },
    _annual_deviation: {
      type: Number,
      required: true,
    },
  },
});
