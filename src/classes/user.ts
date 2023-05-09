import { Type } from "./track.js";

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

export class User {
  private _id: number;
  private _name: string;
  private _activity: Type
  private _friends: number[]
  private _grupos: number[]
  private _stadicitics: Statistics;
  private _favorite_tracks: number[]
  private _challenges: number[]
  private _history: number[]

  constructor( id: number, name: string, activity: Type, friends: number[], grupos: number[], stadicitics: Statistics, favorite_tracks: number[], challenges: number[], history: number[]) {
    this._id = id;
    this._name = name;
    this._activity = activity;
    this._friends = friends;
    this._grupos = grupos;
    this._stadicitics = stadicitics;
    this._favorite_tracks = favorite_tracks;
    this._challenges = challenges;
    this._history = history;
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

  get activity() {
    return this._activity;
  }

  set activity(activity: Type) {
    this._activity = activity;
  }

  get friends() {
    return this._friends;
  }

  set friends(friends: number[]) {
    this._friends = friends;
  }

  get grupos() {
    return this._grupos;
  }

  set grupos(grupos: number[]) {
    this._grupos = grupos;
  }

  get stadicitics() {
    return this._stadicitics;
  }

  set stadicitics(stadicitics: Statistics) {
    this._stadicitics = stadicitics;
  }

  get favorite_tracks() {
    return this._favorite_tracks;
  }

  set favorite_tracks(favorite_tracks: number[]) {
    this._favorite_tracks = favorite_tracks;
  }

  get challenges() {
    return this._challenges;
  }

  set challenges(challenges: number[]) {
    this._challenges = challenges;
  }

  get history() {
    return this._history;
  }

  set history(history: number[]) {
    this._history = history;
  }
  
}