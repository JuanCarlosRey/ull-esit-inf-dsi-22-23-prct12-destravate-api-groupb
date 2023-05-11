import { Statistics, Record } from "./user.js";
import { Document } from "mongoose";

export interface GroupDocument extends Document {
  id: number;
  name: string;
  members: number[];
  global_stadistics: Statistics;
  ranking: number[]; //orden por cantidad de km o por desnivel.
  favorite_tracks: number[];
  group_history: Record;
}