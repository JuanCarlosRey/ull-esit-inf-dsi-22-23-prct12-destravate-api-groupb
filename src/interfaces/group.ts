import { Statistics, Record } from "./user.js";
import { Document } from "mongoose";

/**
 * Group interface
 */

export interface GroupDocument extends Document {
  /**
   * El ID del grupo.
   */
  id: number;

  /**
   * El nombre del grupo.
   */
  name: string;

  /**
   * Los miembros del grupo
   */
  members: number[];

  /**
   * Estadísticas globales del grupo
   */
  global_stadistics: Statistics;

  /**
   * Ranking en función de la cantidad de km o desnivel
   */
  ranking: number[]; 

  /**
   * Rutas favoritas del grupo
   */
  favorite_tracks: number[];

  /**
   * Historial de actividades del grupo
   */
  group_history: Record;
}