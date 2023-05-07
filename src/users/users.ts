import { TYPE } from "../track/track.js";

export type estaditicas = {
   _distancia_semanal: number;
   _desnivel_semanal: number;
   _distancia_mensual: number;
   _desnivel_mensual: number;
   _distancia_anual: number;
   _desnivel_anual: number;
}
export type Date = {
    _day: number;
    _month: number;
    _year: number;
}

export type historial = {
    _id: number;
    _date: Date;
}

export class user {
  private _id: number;
  private _name: string;
  private _activity: TYPE
  private _friends: number[]
  private _grupos: number[]
  private _stadicitics: estaditicas;
  private _favorite_tracks: number[]
  private _challenges: number[]
  private _history: number[]

  constructor( id: number, name: string, activity: TYPE, friends: number[], grupos: number[], stadicitics: estaditicas, favorite_tracks: number[], challenges: number[], history: number[]) {
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

  get name() {
    return this._name;
  }

  get activity() {
    return this._activity;
  }

  get friends() {
    return this._friends;
  }

  get grupos() {
    return this._grupos;
  }

  get stadicitics() {
    return this._stadicitics;
  }

  get favorite_tracks() {
    return this._favorite_tracks;
  }

  get challenges() {
    return this._challenges;
  }

  get history() {
    return this._history;
  }

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set activity(activity: TYPE) {
    this._activity = activity;
  }

  set friends(friends: number[]) {
    this._friends = friends;
  }

  set grupos(grupos: number[]) {
    this._grupos = grupos;
  }

  set stadicitics(stadicitics: estaditicas) {
    this._stadicitics = stadicitics;
  }

  set favorite_tracks(favorite_tracks: number[]) {
    this._favorite_tracks = favorite_tracks;
  }

  set challenges(challenges: number[]) {
    this._challenges = challenges;
  }

  set history(history: number[]) {
    this._history = history;
  }
  
}