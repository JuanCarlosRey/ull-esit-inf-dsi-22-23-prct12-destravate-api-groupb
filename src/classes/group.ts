import { Statistics } from "./user.js";

export class Group {
  private _id: number;
  private _name: string;
  private _members: number[];
  private _global_stadistics: Statistics;
  private _ranking: number[]; //orden por cantidad de km o por desnivel.
  private _favorite_tracks: number[];
  private _group_history: number[];

  constructor(id: number, name: string, members: number[], global_stadistics: Statistics, ranking: number[], favorite_tracks: number[], group_history: number[]) {
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

  set id(id: number) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get members() {
    return this._members;
  }

  set members(members: number[]) {
    this._members = members;
  }

  get global_stadistics() {
    return this._global_stadistics;
  }

  set global_stadistics(stadistics: Statistics) {
    this._global_stadistics = stadistics;
  }

  get ranking() {
    return this._ranking;
  }

  set ranking(ranking: number[]) {
    this._ranking = ranking;
  }

  get favorite_tracks() {
    return this._favorite_tracks;
  }

  set favorite_tracks(favorite_tracks: number[]) {
    this._favorite_tracks = favorite_tracks;
  }

  get group_history() {
    return this._group_history;
  }

  set group_history(group_history: number[]) {
    this._group_history = group_history;
  }
}