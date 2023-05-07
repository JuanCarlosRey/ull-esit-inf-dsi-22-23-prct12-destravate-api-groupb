import { Track } from "../track/track.js";
import { TYPE } from "../track/track.js";

export class challenge {
  private _id: number;
  private _name: string;
  private _tasks: Track[];
  private _type: TYPE;
  private _long: number;
  private _users: string[];

  constructor(id: number, name: string, tasks: Track[], type: TYPE, long: number, users: string[]) {  
    this._id = id;
    this._name = name;
    this._tasks = tasks;
    this._type = type;
    this._long = long;
    this._users = users;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get tasks() {
    return this._tasks;
  }

  get type() {
    return this._type;
  }

  get long() {
    return this._long;
  }

  get users() {
    return this._users;
  }

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set tasks(tasks: Track[]) {
    this._tasks = tasks;
  }

  set type(type: TYPE) {
    this._type = type;
  }

  set long(long: number) {
    this._long = long;
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