import { Type } from "./track.js";
import { Document } from "mongoose";

export type Statistics = {
    _weekly_distance: number;
    _weekly_deviation: number;
    _monthly_distance: number;
    _monthly_deviation: number;
    _annual_distance: number;
    _annual_deviation: number;
}
export type Date = {
    _day: number;
    _month: number;
    _year: number;
}

export type Record = { // Historial
    _id: number;
    _date: Date;
}

export interface UserDocument extends Document {
    id: number;
    name: string;
    activity: Type;
    friends: number[];
    groups: number[];
    stadicitics: Statistics;
    favorite_tracks: number[];
    challenges: number[];
    history: Record;
}
