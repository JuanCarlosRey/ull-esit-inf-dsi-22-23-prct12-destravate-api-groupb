import { Statistics } from "./user.js";
import { Record } from "./user.js";

export interface Group {
  id: number;
  name: string;
  members: number[];
  global_stadistics: Statistics;
  ranking: number[]; //orden por cantidad de km o por desnivel.
  favorite_tracks: number[];
  group_history: Record;
}