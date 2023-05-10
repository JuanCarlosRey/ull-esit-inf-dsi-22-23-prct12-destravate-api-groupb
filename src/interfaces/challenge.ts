import { Type } from "./track.js";

export interface Challenge {
  id: number;
  name: string;
  tracks: number[];
  type: Type;
  long: number;
  users: string[];

}