
export enum TYPE {
  correr = "correr",
  bicicleta = "bicicleta",
}

export type coordenadas = {
  lat: number;
  long: number;
  alt: number;
};

export class Track {
  private _id: number;
  private _name: string;
  private _start: coordenadas;
  private _end: coordenadas;
  private _long: number;
  private _grade: number; //desnivel
  private _users: string[];
  private _type: TYPE;
  private _puntuation: number;

  constructor(
    id: number,
    name: string,
    start: coordenadas,
    end: coordenadas,
    long: number,
    grade: number,
    users: string[],
    type: TYPE,
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

  get name(): string {
    return this._name;
  }

  get start(): coordenadas {
    return this._start;
  }

  get end(): coordenadas {
    return this._end;
  }

  get long(): number {
    return this._long;
  }

  get grade(): number {
    return this._grade;
  }

  get users(): string[] {
    return this._users;
  }

  get type(): TYPE {
    return this._type;
  }

  get puntuation(): number {
    return this._puntuation;
  }

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set start(start: coordenadas) {
    this._start = start;
  }

  set end(end: coordenadas) {
    this._end = end;
  }

  set long(long: number) {
    this._long = long;
  }

  set grade(grade: number) {
    this._grade = grade;
  }

  set users(users: string[]) {
    this._users = users;
  }

  set type(type: TYPE) {
    this._type = type;
  }

  set puntuation(puntuation: number) {
    this._puntuation = puntuation;
  }
}
