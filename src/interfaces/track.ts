export enum Type {
  correr = "correr",
  bicicleta = "bicicleta",
}

export type Coordinates = {
  lat: number;
  long: number;
  alt: number;
};

export interface Track {
  id: number;
  name: string;
  start: Coordinates;
  end: Coordinates;
  long: number;
  grade: number; // desnivel
  users: number[];
  type: Type;
  puntuation: number;
}
