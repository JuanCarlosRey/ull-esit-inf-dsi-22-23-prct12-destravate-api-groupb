import { Type } from "./track.js";
import { Document } from "mongoose";

export interface ChallengeDocument extends Document {
    id: number;
    name: string;
    tracks: number[];
    type: Type;
    long: number;
    users: string[];
}