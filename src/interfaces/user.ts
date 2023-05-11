import { Type } from "./track.js";
import { Document } from "mongoose";

/**
 * Representa las estadísticas de actividad de un usuario.
 */
export class Statistics {
  /**
   * La distancia recorrida semanalmente.
   */
  _weekly_distance: number;

  /**
   * La desviación estándar de la distancia recorrida semanalmente.
   */
  _weekly_deviation: number;

  /**
   * La distancia recorrida mensualmente.
   */
  _monthly_distance: number;

  /**
   * La desviación estándar de la distancia recorrida mensualmente.
   */
  _monthly_deviation: number;

  /**
   * La distancia recorrida anualmente.
   */
  _annual_distance: number;

  /**
   * La desviación estándar de la distancia recorrida anualmente.
   */
  _annual_deviation: number;

  /**
   * Crea una nueva instancia de Statistics.
   * @param weekly_distance La distancia recorrida semanalmente.
   * @param weekly_deviation La desviación estándar de la distancia recorrida semanalmente.
   * @param monthly_distance La distancia recorrida mensualmente.
   * @param monthly_deviation La desviación estándar de la distancia recorrida mensualmente.
   * @param annual_distance La distancia recorrida anualmente.
   * @param annual_deviation La desviación estándar de la distancia recorrida anualmente.
   */
  constructor(
    weekly_distance: number,
    weekly_deviation: number,
    monthly_distance: number,
    monthly_deviation: number,
    annual_distance: number,
    annual_deviation: number
  ) {
    this._weekly_distance = weekly_distance;
    this._weekly_deviation = weekly_deviation;
    this._monthly_distance = monthly_distance;
    this._monthly_deviation = monthly_deviation;
    this._annual_distance = annual_distance;
    this._annual_deviation = annual_deviation;
  }
}

/**
 * Interfaz que representa una fecha con día, mes y año.
 */
export type Date = {
  _day: number;
  _month: number;
  _year: number;
};

/**
 * Clase que representa un registro de historial de actividad.
 */
export class Record {
  /**
   * Identificador del registro.
   */
  _id: number;

  /**
   * Fecha del registro.
   */
  _date: Date;

  /**
   * Crea una instancia de la clase Record.
   * @param id Identificador del registro.
   * @param date Fecha del registro.
   */
  constructor(id: number, date: Date) {
    this._id = id;
    this._date = date;
  }
}

/**
 * Interfaz que representa un documento de usuario.
 */
export interface UserDocument extends Document {
  /**
   * Identificador del usuario.
   */
  id: number;

  /**
   * Nombre del usuario.
   */
  name: string;

  /**
   * Tipo de actividad del usuario.
   */
  activity: Type;

  /**
   * Lista de identificadores de los amigos del usuario.
   */
  friends: number[];

  /**
   * Lista de identificadores de los grupos a los que pertenece el usuario.
   */
  groups: number[];

  /**
   * Estadísticas de actividad del usuario.
   */
  statistics: Statistics;

  /**
   * Lista de identificadores de las pistas favoritas del usuario.
   */
  favorite_tracks: number[];

  /**
   * Lista de identificadores de los desafíos en los que participa el usuario.
   */
  challenges: number[];

  /**
   * Registro de historial de actividad del usuario.
   */
  history: Record;
}
