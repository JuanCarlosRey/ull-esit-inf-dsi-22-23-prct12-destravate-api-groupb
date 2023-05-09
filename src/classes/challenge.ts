import { Type } from "./track.js";

export class Challenge {
  private _id: number;
  private _name: string;
  private _tracks: number[];
  private _type: Type;
  private _long: number;
  private _users: string[];

  constructor(id: number, name: string, tracks: number[], type: Type, long: number, users: string[]) {  
    this._id = id;
    this._name = name;
    this._tracks = tracks;
    this._type = type;
    this._long = long;
    this._users = users;
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

  get tracks() {
    return this._tracks;
  }

  set tracks(tracks: number[]) {
    this._tracks = tracks;
  }

  get type() {
    return this._type;
  }

  set type(type: Type) {
    this._type = type;
  }

  get long() {
    return this._long;
  }

  set long(long: number) {
    this._long = long;
  }

  get users() {
    return this._users;
  }

  set users(users: string[]) {
    this._users = users;
  }
  
  // public static fromObject(object: any): challenge {
  //   const id = object.id;
  //   const name = object.name;
  //   const tasks = object.tasks;
  //   const type = object.type;
  //   const long = object.long;
  //   const users = object.users;
  //   return new challenge(id, name, tasks, type, long, users);
  // }

  // public toObject(): any {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     tasks: this.tasks,
  //     type: this.type,
  //     long: this.long,
  //     users: this.users,
  //   };
  // }

  // public toString(): string {
  //   return `challenge(${JSON.stringify(this.toObject())})`;
  // }

  // public clone(): challenge {
  //   return challenge.fromObject(this.toObject());
  // }

  // public equals(other: challenge): boolean {
  //   return (
  //     this.id === other.id &&
  //     this.name === other.name &&
  //     this.tasks === other.tasks &&
  //     this.type === other.type &&
  //     this.long === other.long &&
  //     this.users === other.users
  //   );
  // }



}