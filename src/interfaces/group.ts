import { Statistics, Record } from "./user.js";
import { Document } from "mongoose";

/**
 * Representa un grupo en la base de datos.
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
   * Los ID de los miembros del grupo.
   */
  members: number[];

  /**
   * Las estadísticas globales del grupo.
   */
  global_statistics: Statistics;

  /**
   * El ranking de los miembros del grupo ordenado por cantidad de km o por desnivel.
   */
  ranking: number[];

  /**
   * Los ID de las pistas favoritas del grupo.
   */
  favorite_tracks: number[];

  /**
   * El historial de actividades del grupo.
   */
  group_history: Record;
}
