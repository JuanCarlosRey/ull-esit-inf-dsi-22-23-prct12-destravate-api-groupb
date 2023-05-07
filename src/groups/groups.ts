import { estaditicas } from "../users/users.js";


export class group {
  private _id: number;
  private _name: string;
  private _members: number[];
  private _global_stadistics: estaditicas;
  private _ranking: number[]; //orden por cantidad de km o por desnivel.
  private _favorite_tracks: number[];
  private _group_history: number[];

  constructor(id: number, name: string, members: number[], global_stadistics: estaditicas, ranking: number[], favorite_tracks: number[], group_history: number[]) {
    this._id = id;
    this._name = name;
    this._members = members;
    this._global_stadistics = global_stadistics;
    this._ranking = ranking;
    this._favorite_tracks = favorite_tracks;
    this._group_history = group_history;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get members() {
    return this._members;
  }

  get global_stadistics() {
    return this._global_stadistics;
  }

  get ranking() {
    return this._ranking;
  }

  get favorite_tracks() {
    return this._favorite_tracks;
  }

  get group_history() {
    return this._group_history;
  }

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }
  
}