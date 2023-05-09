export enum Type {
  correr = "correr",
  bicicleta = "bicicleta",
}

export type Coordinates = {
  lat: number;
  long: number;
  alt: number;
};

export class Track {
  private _id: number;
  private _name: string;
  private _start: Coordinates;
  private _end: Coordinates;
  private _long: number;
  private _grade: number; // desnivel
  private _users: number[];
  private _type: Type;
  private _puntuation: number;

  constructor(
    id: number,
    name: string,
    start: Coordinates,
    end: Coordinates,
    long: number,
    grade: number,
    users: number[],
    type: Type,
    puntuation: number
  ) {
    this._id = id;
    this._name = name;
    this._start = start;
    this._end = end;
    this._long = long;
    this._grade = grade;
    this._users = users;
    this._type = type;
    this._puntuation = puntuation;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get start(): Coordinates {
    return this._start;
  }

  set start(start: Coordinates) {
    this._start = start;
  }

  get end(): Coordinates {
    return this._end;
  }

  set end(end: Coordinates) {
    this._end = end;
  }

  get long(): number {
    return this._long;
  }

  set long(long: number) {
    this._long = long;
  }

  get grade(): number {
    return this._grade;
  }

  set grade(grade: number) {
    this._grade = grade;
  }

  get users(): number[] {
    return this._users;
  }

  set users(users: number[]) {
    this._users = users;
  }

  get type(): Type {
    return this._type;
  }

  set type(type: Type) {
    this._type = type;
  }

  get puntuation(): number {
    return this._puntuation;
  }

  set puntuation(puntuation: number) {
    this._puntuation = puntuation;
  }
}
