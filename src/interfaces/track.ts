import { Document } from "mongoose";

/**
 * Enum que define los posibles tipos de pista.
 */
export enum Type {
  correr = "correr",
  bicicleta = "bicicleta",
}

/**
 * Representa las coordenadas de un punto en el mapa.
 */
export type Coordinates = {
  /**
   * La latitud de las coordenadas.
   */
  lat: number;

  /**
   * La longitud de las coordenadas.
   */
  long: number;

  /**
   * La altitud de las coordenadas.
   */
  alt: number;
};

/**
 * Representa una pista en la base de datos.
 */
export interface TrackDocument extends Document {
  /**
   * El ID de la pista.
   */
  id: number;

  /**
   * El nombre de la pista.
   */
  name: string;

  /**
   * Las coordenadas del punto de inicio de la pista.
   */
  start: Coordinates;

  /**
   * Las coordenadas del punto final de la pista.
   */
  end: Coordinates;

  /**
   * La longitud de la pista en metros.
   */
  long: number;

  /**
   * El grado de inclinación de la pista en porcentaje.
   */
  grade: number;

  /**
   * Los ID de los usuarios que han registrado actividades en la pista.
   */
  users: number[];

  /**
   * El tipo de pista.
   */
  type: Type;

  /**
   * La puntuación de la pista.
   */
  puntuation: number;
}
