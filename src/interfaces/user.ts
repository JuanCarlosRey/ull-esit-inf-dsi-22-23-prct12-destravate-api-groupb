import { Type } from "./track.js";
import { Document } from "mongoose";

export class Statistics {
  _weekly_distance: number;
  _weekly_deviation: number;
  _monthly_distance: number;
  _monthly_deviation: number;
  _annual_distance: number;
  _annual_deviation: number;

  constructor(
    weekly_distance: number,
    weekly_deviation: number,
    monthly_distance: number,
    monthly_deviation: number,
    annual_distance: number,
    annual_deviation: number
  ) {
    this._weekly_distance = weekly_distance;
    this._weekly_deviation = weekly_deviation;
    this._monthly_distance = monthly_distance;
    this._monthly_deviation = monthly_deviation;
    this._annual_distance = annual_distance;
    this._annual_deviation = annual_deviation;
  }
}
export type Date = {
  _day: number;
  _month: number;
  _year: number;
};

export class Record {
  // Historial
  _id: number;
  _date: Date;

  constructor(id: number, date: Date) {
    this._id = id;
    this._date = date;
  }
};

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
