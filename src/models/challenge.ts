import { Schema, model } from 'mongoose';
import { ChallengeDocument } from '../interfaces/challenge.js';

const ChallengeSchema = new Schema<ChallengeDocument>({
    id: {
        type: Number,
        required: true,
        unique: true,
        validate(value: number) {
            if (value < 0) {
                throw new Error('Track ID must be greater than 0');
            }
          }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    tracks: [
        {
            type: Number,
            required: true,
        },
    ],
    type: {
        type: String,
        required: true,
        trim: true
    },
    long: {
        type: Number,
        required: true,
        validate(value: number) {
            if (value < 0) {
              throw new Error('Track length must be greater than 0');
            }
          }
    },
    users: [
        {
            type: Number,
            required: true,
        },
    ],
});

export const ChallengeModel = model<ChallengeDocument>('Challenge', ChallengeSchema);