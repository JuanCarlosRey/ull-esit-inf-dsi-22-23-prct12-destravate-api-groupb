import { Schema, model } from "mongoose";
import { GroupDocument } from "../interfaces/group.js";
import validator from "validator";

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
      validate(value: number) {
        if (value < 0) {
          throw new Error("User ID must be greater than 0");
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
  group_history: [{
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
        if(!validator.default.isDate(value)) {
          throw new Error('Date is invalid');
        }
      }
    },
  }],
});

export const GroupModel = model<GroupDocument>("Group", GroupSchema);
