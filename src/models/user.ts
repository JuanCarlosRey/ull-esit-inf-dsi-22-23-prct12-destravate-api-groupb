import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces/user.js";
import validator from "validator";

const UserSchema = new Schema<UserDocument>({
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
  name: {
    type: String,
    required: true,
    trim: true,
  },
  activity: {
    type: String,
    required: true,
    trim: true,
  },
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
  history: [{
    _id: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Track ID must be greater than 0");
        }
      }
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
  }]
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
//     "weekly_distance": 100,
//     "weekly_deviation": 10,
//     "monthly_distance": 200,
//     "monthly_deviation": 20,
//     "annual_distance": 300,
//     "annual_deviation": 30
//   },
//  "favorite_tracks": [1, 2, 3],
//  "challenges": [1, 2, 3],
//  "history": [
//    {
//      "id": 1,
//      "date": "2021-10-10"
//   },
//   {
//      "id": 2,
//      "date": "2021-10-11"
//   }
//  ]
// }