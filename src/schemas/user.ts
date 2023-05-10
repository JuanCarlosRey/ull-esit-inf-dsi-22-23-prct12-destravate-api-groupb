import { Schema } from 'mongoose';
import { UserDocument } from '../interfaces/user.js';
import { Type } from '../interfaces/track.js'
import { Statistics, Record, Date } from '../interfaces/user.js';

const UserSchema = new Schema<UserDocument>({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error('User ID must be greater than 0');
      }
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  activity: {
    type: String,
    required: true,
    trim: true
  },
  friends: [
    {
      type: Number,
      required: true
    }
  ],
  groups: [
    {
      type: Number,
      required: true
    }
  ],
  stadicitics: {
    type: Statistics,
    required: true
  },
  favorite_tracks:[{
    type: Number,
    required: true
  }],
  challenges: [
    {
      type: Number,
      required: true
    }
  ],
  history: {
    type: Record,
    required: true
  }
});

