import { Type } from "./track.js";
import { Document } from "mongoose";

/**
 * Challenge interface
 */
export interface ChallengeDocument extends Document {
  /**
   * El ID del reto.
   */
  id: number;
  
  /**
   * El nombre del reto.
   */
  name: string;

  /**
   * La descripción del reto.
   */
  tracks: number[];

  /**
   * El tipo de reto.
   */
  type: Type;

  /**
   * La longitud del reto en metros.
   */
  long: number;

  /**
   * Los usuarios que han completado el reto.
   */
  users: string[];
}