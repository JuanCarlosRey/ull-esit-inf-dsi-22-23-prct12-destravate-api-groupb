import { Type } from "./track.js";
import { Document } from "mongoose";

/**
 * Representa un desafío en la base de datos.
 */
export interface ChallengeDocument extends Document {
  /**
   * El ID del desafío.
   */
  id: number;

  /**
   * El nombre del desafío.
   */
  name: string;

  /**
   * Los ID de las pistas asociadas con el desafío.
   */
  tracks: number[];

  /**
   * El tipo de desafío.
   */
  type: Type;

  /**
   * La longitud del desafío en metros.
   */
  long: number;

  /**
   * Los usuarios que han participado en el desafío.
   */
  users: string[];
}
