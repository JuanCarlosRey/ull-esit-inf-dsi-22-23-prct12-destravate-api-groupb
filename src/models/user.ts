import { Schema, model } from 'mongoose';
import { User } from '../classes/user.js';

const UserSchema = new Schema<User>({
    id: {
        type: Number,
        required: true,
        validate(value: number) {
            if (value < 0) {
                throw new Error('Track ID must be greater than 0');
            }
          }
    },
    name: {
        type: String,
        required: true,
    },
    activity: {
        type: String,
        required: true,
    },
    friends: [
        {
            type: Number,
            required: true,
        },
    ],
    groups: [
        {
            type: Number,
            required: true,
        },
    ],
    stadicitics: {
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
    favorite_tracks: [
        {
            type: Number,
            required: true,
        },
    ],
    challenges: [
        {
            type: Number,
            required: true,
        },
    ],
    history: {
        _id: {
            type: Number,
            required: true,
        },
        _date: {
            type: Number,
            required: true,
        },
    }
});

export const UserModel = model<User>('User', UserSchema);