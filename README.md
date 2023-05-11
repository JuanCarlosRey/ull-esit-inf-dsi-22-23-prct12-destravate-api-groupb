# Informe Practica 12

## Grupo B.
  - Juan Carlos Rey Medina
    - alu0101410869
  - Ancor González Carballo
    - alu0101327679
  - Cristopher Alexandro Medina Peschiutta
    - alu0101333281

## Introducción

En esta segunda práctica grupal de la asignatura se ha llevado a cabo un API REST, haciendo uso de Node/Express, que permita llevar a cabo operaciones de creación, lectura, modificación y borrado (Create, Read, Update, Delete - CRUD) de un registro de actividades deportivas. Se hara uso de MongoDB, Mongoose y cyclic.

## Tareas previas

- Peparar el entorno virtual para que contenga:

  1. [TyeDoc](https://typedoc.org)
  2. [Mocha](https://mochajs.org)
  3. [Chai](https://www.chaijs.com)
  4. Prettier
  5. eslint
  6. [Instanbull](https://istanbul.js.org/)
  7. [Coveralls](https://coveralls.io/)
  8. [Prompt-sync](https://www.npmjs.com/package/prompt-sync)
     - `npm i prompt-sync`
     - `npm i --save-dev @types/prompt-sync`
  9. [Yargs](https://www.npmjs.com/package/yargs)
  10. [Chalks](https://www.npmjs.com/package/chalk)
  11. GitHub Actions
      - Pages
      - Coveralls
      - SonarCloud
  12. Entender un poco el [API sincrona de Node.js](https://nodejs.org/docs/latest-v19.x/api/fs.html)
  13. [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-es_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624563&adgroup=115749706983&cq_cmp=12212624563&gad=1&gclid=Cj0KCQjwpPKiBhDvARIsACn-gzCQHOJICmBBlepfO_tXL56MSFr49BQzigSruRPp-eqpa3jtGzWgjPIaAgYCEALw_wcB)
  14. [cyclic](https://www.cyclic.sh/)
- Tener a mano el [guion de la practica](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupb.git)

## Proyecto

### db

```ts
/**
 * Conecta a un servidor de base de datos MongoDB.
 * @param uri - La URL del servidor de base de datos MongoDB.
 * @returns Una promesa que se resuelve con nada si la conexión es exitosa.
 * @throws Si la conexión no puede establecerse o hay un error en la conexión.
 */
declare function connect(uri: string): Promise<void>;

/**
 * Intenta conectarse a un servidor de base de datos MongoDB que se ejecuta localmente.
 */
try {
  await connect("mongodb://127.0.0.1:27017/sports-app");
  console.log("Connection to MongoDB server established");
} catch (error) {
  console.log("Unable to connect to MongoDB server");
}
```

El código define una función `connect` que acepta una URL de servidor de base de datos MongoDB como parámetro y devuelve una promesa que se resuelve sin nada si la conexión es exitosa. La función `connect` también puede lanzar una excepción si la conexión no puede establecerse o hay un error en la conexión.

En el bloque `try`, el código intenta conectarse a un servidor de base de datos MongoDB que se ejecuta localmente en `mongodb://127.0.0.1:27017/sports-app`. Si la conexión se establece correctamente, se imprimirá el mensaje "Connection to MongoDB server established" en la consola. Si hay algún error al conectarse, se imprimirá el mensaje "Unable to connect to MongoDB server" en la consola.

### Interfaces

El codigo del fichero challenge.ts es:

```ts
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
```
El código define una interfaz TypeScript llamada "ChallengeDocument" que representa un desafío en la base de datos. La interfaz extiende la interfaz "Document" de Mongoose, lo que significa que puede ser utilizada para definir el modelo de datos de un documento en la base de datos MongoDB.

La interfaz tiene propiedades que describen el desafío, incluyendo un ID, nombre, ID de pistas asociadas con el desafío, tipo de desafío, longitud del desafío en metros, y una lista de usuarios que han participado en el desafío. 

La propiedad "type" es de un tipo personalizado llamado "Type", que se importa del módulo "track.js".

El codigo del fichero group.ts es:

```ts
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
```

Este código define una interfaz TypeScript llamada `GroupDocument` que representa un grupo en la base de datos. La interfaz tiene varias propiedades que definen los datos asociados con el grupo. Estas propiedades incluyen:

- `id`: el ID del grupo
- `name`: el nombre del grupo
- `members`: un array con los IDs de los miembros del grupo
- `global_statistics`: un objeto que contiene las estadísticas globales del grupo, definidas en otra interfaz llamada `Statistics`
- `ranking`: un array con los IDs de los miembros del grupo ordenados por cantidad de km o desnivel.
- `favorite_tracks`: un array con los IDs de las pistas favoritas del grupo
- `group_history`: un objeto que contiene el historial de actividades del grupo, definido en otra interfaz llamada `Record`.

Además, esta interfaz utiliza la interfaz `Document` proporcionada por Mongoose para definir que este objeto es un documento de base de datos.


El codigo del fichero track.ts es:

```ts
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
```

Este código define la estructura de una pista en la base de datos de la aplicación. La pista está representada por una interfaz `TrackDocument` que extiende la clase `Document` de Mongoose. La interfaz define los siguientes atributos de una pista:

- `id`: el ID de la pista.
- `name`: el nombre de la pista.
- `start`: las coordenadas del punto de inicio de la pista.
- `end`: las coordenadas del punto final de la pista.
- `long`: la longitud de la pista en metros.
- `grade`: el grado de inclinación de la pista en porcentaje.
- `users`: los ID de los usuarios que han registrado actividades en la pista.
- `type`: el tipo de pista (correr o bicicleta).
- `puntuation`: la puntuación de la pista.

Además, el código define un enum `Type` que define los posibles tipos de pista y un tipo `Coordinates` que representa las coordenadas de un punto en el mapa.

El codigo del fichero user.ts es:

```ts
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
```

Este código define un conjunto de clases, interfaces y tipos que representan la estructura de datos de un usuario en una aplicación relacionada con la actividad física. La clase `Statistics` representa las estadísticas de actividad de un usuario, y la clase `Record` representa un registro de historial de actividad. La interfaz `UserDocument` representa un documento de usuario que se utiliza en la base de datos, y utiliza la enumeración `Type` importada desde el módulo `./track.js`. El código define también un tipo `Date` que representa una fecha con día, mes y año. En general, estos elementos se combinan para representar la información necesaria para un usuario en una aplicación de seguimiento de actividad física.

### Models

El codigo del fichero challenge.ts es:

```ts
import { Schema, model } from "mongoose";
import { ChallengeDocument } from "../interfaces/challenge.js";

/**
 * Esquema de Mongoose para el modelo de desafío.
 * @category Desafío
 */
const ChallengeSchema = new Schema<ChallengeDocument>({
  /**
   * Identificador único del desafío.
   */
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("El ID del desafío debe ser mayor que 0");
      }
    },
  },
  /**
   * Nombre del desafío.
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Lista de identificadores de las pistas asociadas al desafío.
   */
  tracks: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("El ID de la pista debe ser mayor que 0");
        }
      },
    },
  ],
  /**
   * Tipo de desafío.
   */
  type: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * Longitud total de las pistas asociadas al desafío.
   */
  long: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("La longitud de la pista debe ser mayor que 0");
      }
    },
  },
  /**
   * Lista de identificadores de los usuarios que participan en el desafío.
   */
  users: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("El ID del usuario debe ser mayor que 0");
        }
      },
    },
  ],
});

/**
 * Modelo de Mongoose para el desafío.
 * @category Desafío
 */
export const ChallengeModel = model<ChallengeDocument>(
  "Challenge",
  ChallengeSchema
);


//example of a challenge
// {
//   "id": 1,
//   "name": "Challenge 1",
//   "tracks": [1, 2, 3],
//   "type": "challenge",
//   "long": 100,
//   "users": [1, 2, 3]
// }
```

Este código es un ejemplo de cómo definir un esquema de datos y un modelo de Mongoose para un modelo de desafío en una aplicación Node.js con MongoDB. En resumen, el código hace lo siguiente:

1. Importa las funciones `Schema` y `model` de Mongoose y la interfaz `ChallengeDocument` de otro archivo que define la estructura de los documentos del modelo de desafío.
2. Define un nuevo esquema de Mongoose para el modelo de desafío utilizando la función `Schema`. El esquema especifica los campos que componen el modelo de desafío y sus tipos de datos, opciones de validación, etc. En este caso, el modelo de desafío tiene seis campos: `id`, `name`, `tracks`, `type`, `long` y `users`.
3. Cada campo tiene una definición de tipo y opciones. Por ejemplo, el campo `id` tiene un tipo `Number` y es requerido y único. También tiene una función de validación personalizada que comprueba que el valor es mayor que 0. El campo `tracks` es una lista de números que también se valida para que cada valor sea mayor que 0. Los otros campos son similares.
4. Finalmente, el código exporta un modelo de Mongoose llamado `ChallengeModel` que utiliza el esquema `ChallengeSchema` y está etiquetado con el nombre "Challenge".

Este modelo se puede utilizar para realizar operaciones CRUD (crear, leer, actualizar y eliminar) en los documentos del modelo de desafío en la base de datos de MongoDB. El ejemplo de un desafío proporcionado al final del código muestra cómo se podrían ver los datos almacenados en un documento de desafío.

El codigo del fichero group.ts es:

```ts
import { Schema, model } from "mongoose";
import { GroupDocument } from "../interfaces/group.js";
import validator from "validator";

/**
 * Esquema para un Grupo en la aplicación.
 * @typedef {Object} GroupSchema
 * @property {number} id - ID del grupo.
 * @property {string} name - Nombre del grupo.
 * @property {Array<number>} members - IDs de los miembros del grupo.
 * @property {Object} global_stadistics - Estadísticas globales del grupo.
 * @property {number} global_stadistics._weekly_distance - Distancia semanal total del grupo.
 * @property {number} global_stadistics._weekly_deviation - Desviación semanal total del grupo.
 * @property {number} global_stadistics._monthly_distance - Distancia mensual total del grupo.
 * @property {number} global_stadistics._monthly_deviation - Desviación mensual total del grupo.
 * @property {number} global_stadistics._annual_distance - Distancia anual total del grupo.
 * @property {number} global_stadistics._annual_deviation - Desviación anual total del grupo.
 * @property {Array<number>} ranking - IDs de los usuarios en el ranking del grupo.
 * @property {Array<number>} favorite_tracks - IDs de las pistas favoritas del grupo.
 * @property {Array<Object>} group_history - Historial de pistas del grupo.
 * @property {number} group_history._id - ID de la pista.
 * @property {string} group_history._date - Fecha de la pista en formato "YYYY-MM-DD".
 */
const GroupSchema = new Schema<GroupDocument>({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("El ID del grupo debe ser mayor que 0");
      }
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("El ID del usuario debe ser mayor que 0");
        }
      },
    },
  ],
  global_stadistics: {
    _weekly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La distancia debe ser mayor que 0");
        }
      },
    },
    _weekly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La desviación debe ser mayor que 0");
        }
      },
    },
    _monthly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La distancia debe ser mayor que 0");
        }
      },
    },
    _monthly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("La desviación debe ser mayor que 0");
        }
      },
    },
    _annual_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Distance must be greater than 0");
        }
      },
    },
    _annual_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Deviation must be greater than 0");
        }
      },
    },
  },
  ranking: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("User ID must be greater than 0");
        }
      },
    },
  ],
  favorite_tracks: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Track ID must be greater than 0");
        }
      },
    },
  ],
  group_history: [
    {
      _id: {
        type: Number,
        required: true,
        validate(value: number) {
          if (value < 0) {
            throw new Error("Track ID must be greater than 0");
          }
        },
      },
      _date: {
        type: String,
        required: true,
        validate(value: string) {
          if (!validator.default.isDate(value)) {
            throw new Error("Date is invalid");
          }
        },
      },
    },
  ],
});

export const GroupModel = model<GroupDocument>("Group", GroupSchema);

//example of a group
// {
//   "id": 1,
//   "name": "Grupo 1",
//   "members": [1, 2, 3, 4, 5],
//   "global_stadistics": {
//     "_weekly_distance": 123,
//     "_weekly_deviation": 123,
//     "_monthly_distance": 123,
//     "_monthly_deviation": 123,
//     "_annual_distance": 123,
//     "_annual_deviation": 123
//   },
//   "ranking": [1, 2, 3, 4, 5],
//   "favorite_tracks": [1, 2, 3, 4, 5],
//   "group_history": [
//     {
//       "_id": 1,
//       "_date": "2021-10-10"
//     },
//     {
//       "_id": 2,
//       "_date": "2021-10-10"
//     },
//   ]
// }
```

Este código es un modelo de mongoose para un esquema de un grupo en una aplicación. El código importa `Schema` y `model` de mongoose y `validator` de una librería externa. El modelo define los campos que debe tener un grupo, como su `id`, `name`, `members`, `global_stadistics`, `ranking`, `favorite_tracks`, y `group_history`. La mayoría de los campos son arreglos o objetos que contienen subcampos, y algunos campos tienen validaciones para asegurarse de que los valores ingresados cumplan con ciertos requisitos, como ser mayores que cero y tener un formato de fecha válido. Además, el modelo utiliza el tipo de documento `GroupDocument`, que está definido en otro archivo en una interfaz. El modelo finalmente se exporta como `GroupModel`. El ejemplo de un grupo al final del archivo muestra cómo se vería un objeto que se ajusta al esquema de este modelo.

El codigo del fichero track.ts es:

```ts
import { Schema, model } from "mongoose";
import { TrackDocument } from "../interfaces/track.js";

/**
 * Esquema de Mongoose para una pista
 */

const TrackSchema = new Schema<TrackDocument>({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track ID must be greater than 0");
      }
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    lat: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Latitude must be greater than 0");
        }
      },
    },
    long: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Length must be greater than 0");
        }
      },
    },
    alt: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Altitude must be greater than 0");
        }
      },
    },
  },
  end: {
    lat: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Latitude must be greater than 0");
        }
      },
    },
    long: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Length must be greater than 0");
        }
      },
    },
    alt: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Altitude must be greater than 0");
        }
      },
    },
  },
  long: {
    type: Number,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Track length must be greater than 0");
      }
    },
  },
  grade: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Grade of desviation must be greater than 0");
      }
    },
  },
  users: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("User ID must be greater than 0");
        }
      },
    },
  ],
  type: {
    type: String,
    required: true,
    trim: true,
  },
  puntuation: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0 || value > 5) {
        throw new Error("Puntuation must be a number between 0 and 5");
      }
    },
  },
});

export const TrackModel = model<TrackDocument>("Track", TrackSchema);

// example of a track
// {
//   "id": 1,
//   "name": "Track 1",
//   "start": {
//     "lat": 28.123,
//     "long": 16.123,
//     "alt": 123
//   },
//   "end": {
//     "lat": 28.123,
//     "long": 16.123,
//     "alt": 123
//   },
//   "long": 123,
//   "grade": 123,
//   "users": [1, 2, 3],
//   "type": "running",
//   "puntuation": 4
// }
```

Este código es una definición de un esquema de Mongoose para una pista de carrera o senderismo, utilizando TypeScript. Mongoose es una biblioteca de modelado de objetos de MongoDB para Node.js y permite definir modelos para las colecciones de MongoDB. 

En primer lugar, se importan las clases `Schema` y `model` de Mongoose y la interfaz `TrackDocument`. Luego, se define un objeto `TrackSchema` que contiene los campos de una pista, tales como `id`, `name`, `start`, `end`, `long`, `grade`, `users`, `type` y `puntuation`. 

Cada campo tiene un tipo de dato específico (como `Number` o `String`) y, en algunos casos, también se definen opciones adicionales (como `required: true` o `unique: true`). Además, algunos campos también tienen validaciones personalizadas, como asegurarse de que los valores numéricos sean mayores que cero o que la puntación esté entre 0 y 5.

Finalmente, se exporta el modelo `TrackModel`, que se puede utilizar para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la colección de pistas en MongoDB. El ejemplo al final del código es una instancia de un objeto de pista con valores de ejemplo para cada campo.

El codigo del fichero user.ts es:

```ts
import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces/user.js";
import validator from "validator";

const UserSchema = new Schema<UserDocument>({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error("User ID must be greater than 0");
      }
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  activity: {
    type: String,
    required: true,
    trim: true,
  },
  friends: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("User ID must be greater than 0");
        }
      },
    },
  ],
  groups: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Group ID must be greater than 0");
        }
      },
    },
  ],
  statistics: {
    _weekly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Distance must be greater than 0");
        }
      },
    },
    _weekly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Deviation must be greater than 0");
        }
      },
    },
    _monthly_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Distance must be greater than 0");
        }
      },
    },
    _monthly_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Deviation must be greater than 0");
        }
      },
    },
    _annual_distance: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Distance must be greater than 0");
        }
      },
    },
    _annual_deviation: {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Deviation must be greater than 0");
        }
      },
    },
  },
  favorite_tracks: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Track ID must be greater than 0");
        }
      },
    },
  ],
  challenges: [
    {
      type: Number,
      required: true,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Challenge ID must be greater than 0");
        }
      },
    },
  ],
  history: [
    {
      _id: {
        type: Number,
        required: true,
        validate(value: number) {
          if (value < 0) {
            throw new Error("Track ID must be greater than 0");
          }
        },
      },
      _date: {
        type: String,
        required: true,
        validate(value: string) {
          if (!validator.default.isDate(value)) {
            throw new Error("Date is invalid");
          }
        },
      },
    },
  ],
});

export const UserModel = model<UserDocument>("User", UserSchema);

//example of a user
// {
//   "id": 1,
//   "name": "John Doe",
//   "activity": "running",
//   "friends": [2, 3, 4],
//   "groups": [1, 2],
//   "statistics": {
//     "weekly_distance": 100,
//     "weekly_deviation": 10,
//     "monthly_distance": 200,
//     "monthly_deviation": 20,
//     "annual_distance": 300,
//     "annual_deviation": 30
//   },
//  "favorite_tracks": [1, 2, 3],
//  "challenges": [1, 2, 3],
//  "history": [
//    {
//      "id": 1,
//      "date": "2021-10-10"
//   },
//   {
//      "id": 2,
//      "date": "2021-10-11"
//   }
//  ]
// }
```

Este código es un modelo de mongoose que define un esquema para los usuarios de una aplicación. Mongoose es una biblioteca de JavaScript que se utiliza para interactuar con bases de datos MongoDB. 

El código importa dos objetos de mongoose: `Schema` y `model`. `Schema` se utiliza para definir la estructura de la colección de MongoDB y `model` se utiliza para crear un modelo de esta estructura.

El objeto `UserSchema` define la estructura del documento de usuario que se almacenará en MongoDB. Tiene un campo `id` de tipo numérico, `name` y `activity` de tipo cadena de texto, `friends` y `groups` que son matrices de identificadores de usuarios y grupos respectivamente, `statistics` que es un objeto con campos numéricos que almacenan la distancia y la desviación de un usuario en diferentes periodos de tiempo, `favorite_tracks` y `challenges` que son matrices de identificadores de pistas y desafíos respectivamente, y `history` que es una matriz de objetos que contienen el identificador de una pista y la fecha en que el usuario la completó.

Cada campo tiene un tipo de dato y puede tener validaciones adicionales, como `required`, `unique`, `trim` y `validate`. Las validaciones se utilizan para asegurarse de que los datos cumplen ciertas condiciones, por ejemplo, que los identificadores sean mayores que cero y que las fechas sean válidas.

El objeto `UserModel` es un modelo de mongoose que se crea a partir del esquema `UserSchema`. Se utiliza para realizar operaciones de lectura y escritura en la colección de usuarios de MongoDB. 

Finalmente, se proporciona un ejemplo de cómo se vería un documento de usuario almacenado en la base de datos.

### routers
El codigo del fichero challenge.ts es:

```ts
import express from "express";
import { ChallengeModel } from "../models/challenge.js";

/**
 * Express Router for challenges
 */
export const challengeRouter = express.Router();
/**
 * Create a new challenge
 * @param req - Express request object
 * @param res - Express response object
 * @returns The created challenge
 */
challengeRouter.post("/challenges", async (req, res) => {
  const challenge = new ChallengeModel(req.body);

  try {
    await challenge.save();
    return res.status(201).send(challenge);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Get challenges that match a filter
 * @param req - Express request object
 * @param res - Express response object
 * @returns Challenges that match the filter
 */
challengeRouter.get("/challenges", async (req, res) => {
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const challenges = await ChallengeModel.findOne(filter);
    if (challenges) {
      return res.send(challenges);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Get a challenge by ID
 * @param req - Express request object
 * @param res - Express response object
 * @returns The challenge that matches the ID
 */
challengeRouter.get("/challenges/:id", async (req, res) => {
  try {
    const challenges = await ChallengeModel.findOne({
      id: req.params.id,
    });
    if (challenges) {
      return res.send(challenges);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Update a challenge by name
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated challenge
 */
challengeRouter.patch("/challenges", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = ["id", "name", "tracks", "type", "long", "users"];

  const isValidOperation = actualUpdates.every((update) => {
    allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const challenge = await ChallengeModel.findOneAndUpdate(
      {
        name: req.query.name.toString(),
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (challenge) {
      return res.send(challenge);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * Update a challenge by ID
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated challenge
 */
challengeRouter.patch("/challenges/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
/**

Maneja las solicitudes para eliminar un desafío por su nombre.
@function
@async
@param {Object} req - Objeto de solicitud Express.
@param {Object} res - Objeto de respuesta Express.
@returns {Object} Objeto del desafío eliminado.
@throws {Error} Error de servidor interno.
*/
challengeRouter.delete("/challenges", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const challenge = await ChallengeModel.findOneAndDelete({
      name: req.query.name,
    });
    if (challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Maneja las solicitudes para eliminar un desafío por su ID.
@function
@async
@param {Object} req - Objeto de solicitud Express.
@param {Object} res - Objeto de respuesta Express.
@returns {Object} Objeto del desafío eliminado.
@throws {Error} Error de servidor interno.
*/
challengeRouter.delete("/challenges/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findOneAndDelete({
      id: req.params.id,
    });
    if (challenge) {
      return res.send(challenge);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
```

Este código crea un enrutador de Express para manejar solicitudes relacionadas con los desafíos. El enrutador se exporta como un objeto llamado `challengeRouter`.

El código define varias rutas HTTP para manejar solicitudes de creación, lectura, actualización y eliminación de desafíos. Cada ruta se define usando una función de enrutamiento correspondiente de Express (por ejemplo, `challengeRouter.post` para la creación de desafíos) y especifica una URL de ruta (por ejemplo, `"/challenges"` para la ruta de creación).

La ruta de creación de desafíos (`challengeRouter.post`) espera una solicitud HTTP POST que contiene datos de desafío en el cuerpo de la solicitud. Luego crea un nuevo objeto de modelo de desafío utilizando los datos proporcionados y lo guarda en la base de datos. Si la operación es exitosa, devuelve el objeto de desafío recién creado en una respuesta HTTP con un código de estado 201 (creado).

La ruta de lectura de desafíos (`challengeRouter.get`) se puede invocar de dos maneras diferentes. Si se llama sin un parámetro de consulta, devuelve una lista de todos los desafíos en la base de datos. Si se llama con un parámetro de consulta llamado "name", devuelve una lista de desafíos que coinciden con el valor de ese parámetro. Si se encuentra uno o más desafíos, los devuelve en una respuesta HTTP con un código de estado 200 (éxito). Si no se encuentra ningún desafío, devuelve una respuesta HTTP con un código de estado 404 (no encontrado).

Las rutas de actualización de desafíos (`challengeRouter.patch`) se pueden invocar de dos maneras diferentes. La primera ruta espera un parámetro de consulta "name" y los datos de desafío actualizados en el cuerpo de la solicitud. Busca un desafío con el nombre dado, actualiza los campos correspondientes con los datos proporcionados y devuelve el objeto de desafío actualizado en una respuesta HTTP con un código de estado 200 (éxito). Si no se encuentra un desafío con el nombre dado, devuelve una respuesta HTTP con un código de estado 404 (no encontrado). La segunda ruta espera un parámetro de ruta "id" en lugar de un parámetro de consulta, y actualiza un desafío con el ID dado de manera similar.

Las rutas de eliminación de desafíos (`challengeRouter.delete`) se pueden invocar de manera similar a las rutas de actualización. La primera ruta espera un parámetro de consulta "name" y elimina un desafío con el nombre dado de la base de datos. Si se encuentra y elimina un desafío, devuelve el objeto de desafío eliminado en una respuesta HTTP con un código de estado 200 (éxito). Si no se encuentra un desafío con el nombre dado, devuelve una respuesta HTTP con un código de estado 404 (no encontrado). La segunda ruta espera un parámetro de ruta "id" en lugar de un parámetro de consulta, y elimina un desafío con el ID dado de manera similar.


El codigo del fichero default.ts es:

```ts
/** 
 * @fileoverview Define el enrutador por defecto que maneja todas las peticiones no encontradas 
 * @module DefaultRouter
 */

import express, { Request, Response } from "express";

/** Define el enrutador por defecto */
export const defaultRouter = express.Router();

/**
 * Maneja todas las peticiones no encontradas y devuelve un estado 501
 * @name all/*
 * @function
 * @memberof module:DefaultRouter
 * @param {Request} req - Objeto de solicitud de Express
 * @param {Response} res - Objeto de respuesta de Express
 */
defaultRouter.all("*", (req: Request, res: Response) => {
  res.status(501).send();
});
```

Este código define un enrutador por defecto usando el framework de Node.js llamado Express. El enrutador se crea utilizando el método `express.Router()`. Luego se define una función manejadora para todas las peticiones HTTP que no han sido manejadas por otro enrutador. Esta función se registra para todas las rutas utilizando el método `all()`.

La función manejadora simplemente establece un código de estado HTTP 501 ("No implementado") y envía la respuesta al cliente. En resumen, este enrutador manejará todas las peticiones no encontradas en otras rutas definidas en la aplicación y responderá con un estado 501.

El codigo del fichero group.ts es:

```ts

/**

Module for handling routes related to groups
@module groupRouter
*/
import express from "express";
import { GroupModel } from "../models/group.js";

/** Express router for groups */
export const groupRouter = express.Router();
/**

Route for creating a new group
@name post/groups
@function
@memberof module:groupRouter
@param {Object} req - Express request object
@param {Object} req.body - Request body containing the group's data
@param {string} req.body.name - The name of the group
@param {Array} req.body.members - An array of user IDs representing members of the group
@param {Object} req.body.global_statistics - An object containing global statistics for the group
@param {Array} req.body.ranking - An array of user IDs representing the group's ranking
@param {Array} req.body.favorite_tracks - An array of track IDs representing the group's favorite tracks
@param {Array} req.body.group_history - An array of objects representing the group's history
@param {Object} res - Express response object
@returns {Object} Returns the newly created group or an error
@throws {Error} Throws an error if the group creation fails
*/
groupRouter.post("/groups", async (req, res) => {
  const group = new GroupModel(req.body);

  try {
    await group.save();
    return res.status(201).send(group);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Route for finding a group or groups by name
@name get/groups
@function
@memberof module:groupRouter
@param {Object} req - Express request object
@param {string} req.query.name - The name of the group to find
@param {Object} res - Express response object
@returns {Object} Returns the found group or groups or an error
@throws {Error} Throws an error if the find operation fails
*/
groupRouter.get("/groups", async (req, res) => {
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const groups = await GroupModel.findOne(filter);
    if (groups) {
      return res.send(groups);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Route for finding a group by ID
@name get/groups/:id
@function
@memberof module:groupRouter
@param {Object} req - Express request object
@param {string} req.params.id - The ID of the group to find
@param {Object} res - Express response object
@returns {Object} Returns the found group or an error
@throws {Error} Throws an error if the find operation fails
*/
groupRouter.get("/groups/:id", async (req, res) => {
  try {
    const groups = await GroupModel.find({
      id: req.params.id,
    });
    if (groups) {
      return res.send(groups);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @route PATCH /groups
 * @group Groups - Operaciones CRUD para grupos
 * @param {string} name.query.required - Nombre del grupo a actualizar.
 * @param {Group.model} body.required - Información actualizada del grupo.
 * @returns {Group.model} 200 - Grupo actualizado.
 * @returns {Error} 400 - No se proporcionó el nombre del grupo.
 * @returns {Error} 400 - Actualizaciones inválidas.
 * @returns {Error} 404 - No se encontró el grupo especificado.
 * @returns {Error} 500 - Error interno del servidor.
 */
groupRouter.patch("/groups", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = [
    "id",
    "name",
    "members",
    "global_stadistics",
    "ranking",
    "favorite_tracks",
    "group_history",
  ];

  const isValidOperation = actualUpdates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const group = await GroupModel.findOneAndUpdate(
      { name: req.query.name.toString() },
      req.body,
      { new: true, runValidators: true }
    );

    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @route PATCH /groups/:id
 * @group Groups - Operaciones CRUD para grupos
 * @param {string} id.path.required - Identificador del grupo a actualizar.
 * @param {Group.model} body.required - Información actualizada del grupo.
 * @returns {Group.model} 200 - Grupo actualizado.
 * @returns {Error} 404 - No se encontró el grupo especificado.
 * @returns {Error} 500 - Error interno del servidor.
 */
groupRouter.patch("/groups/:id", async (req, res) => {
  try {
    const group = await GroupModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Deletes a group by its name
@route DELETE /groups
@param {string} name.query.required - name of the group to delete
@returns {Object} 200 - Deleted group
@returns {Object} 404 - Group not found
@returns {Error} 400 - Bad request
@returns {Error} 500 - Internal server error
*/
groupRouter.delete("/groups", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const group = await GroupModel.findOneAndDelete({
      name: req.query.name,
    });
    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Deletes a group by its id
@route DELETE /groups/{id}
@param {string} id.path.required - id of the group to delete
@returns {Object} 200 - Deleted group
@returns {Object} 404 - Group not found
@returns {Error} 500 - Internal server error
*/
groupRouter.delete("/groups/:id", async (req, res) => {
  try {
    const group = await GroupModel.findOneAndDelete({
      id: req.params.id,
    });
    if (group) {
      return res.send(group);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
```

El código es un archivo de módulo de Node.js que maneja las rutas relacionadas con los grupos. Utiliza el framework Express para definir un enrutador que se encarga de manejar peticiones HTTP para crear, buscar y actualizar grupos en una base de datos MongoDB.

El archivo comienza importando el módulo Express y el modelo de datos GroupModel. Luego, define el enrutador de Express para manejar las solicitudes relacionadas con los grupos.

A continuación, hay cuatro rutas definidas en el enrutador. La primera ruta maneja solicitudes POST para crear un nuevo grupo en la base de datos. La segunda ruta maneja solicitudes GET para buscar grupos por nombre. La tercera ruta maneja solicitudes GET para buscar un grupo por ID. Finalmente, las dos últimas rutas manejan solicitudes PATCH para actualizar grupos, una usando el nombre del grupo y la otra usando el ID del grupo.

En cada ruta, se maneja la solicitud y se devuelve una respuesta apropiada según el éxito o el error en la operación.

El codigo del fichero track.ts es:

```ts
import express from "express";
import { TrackModel } from "../models/track.js";

export const trackRouter = express.Router();
/**

Route for creating a new track resource.
@name POST /tracks
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the new track if successful, or an error response if unsuccessful.
*/
trackRouter.post("/tracks", async (req, res) => {
  const track = new TrackModel(req.body);

  try {
    await track.save();
    return res.status(201).send(track);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Route for retrieving track resources.
@name GET /tracks
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the requested tracks if successful, or an error response if unsuccessful.
*/
trackRouter.get("/tracks", async (req, res) => {
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const tracks = await TrackModel.findOne(filter);
    if (tracks) {
      return res.send(tracks);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Route for retrieving a specific track resource by ID.
@name GET /tracks/:id
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the requested track if successful, or an error response if unsuccessful.
*/
trackRouter.get("/tracks/:id", async (req, res) => {
  try {
    const tracks = await TrackModel.findOne({
      id: req.params.id,
    });
    if (tracks) {
      return res.send(tracks);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Route for updating track resources.
@name PATCH /tracks
@function
@memberof module:TrackRouter
@param {Request} req - Express request object.
@param {Response} res - Express response object.
@returns {Response} Returns a JSON object representing the updated track if successful, or an error response if unsuccessful.
*/
trackRouter.patch("/tracks", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = [
    "id",
    "name",
    "start",
    "end",
    "long",
    "grade",
    "users",
    "type",
    "puntuation",
  ];

  const isValidUpdate = allowedUpdates.every((update) =>
    actualUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    const track = await TrackModel.findOneAndUpdate(
      { name: req.query.name.toString() },
      req.body,
      { new: true, runValidators: true }
    );

    if (track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Updates a track by id

@method PATCH

@param {string} req.params.id - The id of the track to be updated.

@param {Object} req.body - The data to update the track with.

@returns {Object} The updated track.

@throws {Error} If there was an error updating the track.
*/
trackRouter.patch("/tracks/:id", async (req, res) => {
  try {
    const track = await TrackModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (track) {
      return res.send(track);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Deletes a track by name
@method DELETE
@param {string} req.query.name - The name of the track to be deleted.
@returns {Object} The deleted track.
@throws {Error} If there was an error deleting the track.
*/
trackRouter.delete("/tracks", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const track = await TrackModel.findOneAndDelete({
      name: req.query.name,
    });
    if (track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Deletes a track by id
@method DELETE
@param {string} req.params.id - The id of the track to be deleted.
@returns {Object} The deleted track.
@throws {Error} If there was an error deleting the track.
*/
trackRouter.delete("/tracks/:id", async (req, res) => {
  try {
    const track = await TrackModel.findOneAndDelete({
      id: req.params.id,
    });
    if (track) {
      return res.send(track);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
```

Este código define un enrutador (`trackRouter`) para una aplicación Express que maneja solicitudes para una colección de "tracks" (pistas o canciones). Los métodos disponibles son los siguientes:

- POST /tracks: crea una nueva pista con los datos proporcionados en el cuerpo de la solicitud. Retorna un objeto JSON representando la nueva pista si tiene éxito, o una respuesta de error si falla.
- GET /tracks: recupera una lista de pistas. Si se proporciona el parámetro `name` en la cadena de consulta de la solicitud, se filtran las pistas por ese nombre. Retorna un objeto JSON representando las pistas solicitadas si tiene éxito, o una respuesta de error si falla.
- GET /tracks/:id: recupera una pista específica según su identificador `id`. Retorna un objeto JSON representando la pista solicitada si tiene éxito, o una respuesta de error si falla.
- PATCH /tracks y PATCH /tracks/:id: actualiza una o varias propiedades de una pista, identificada por el parámetro `name` o `id` de la solicitud, respectivamente. Retorna un objeto JSON representando la pista actualizada si tiene éxito, o una respuesta de error si falla.
- DELETE /tracks y DELETE /tracks/:id: elimina una pista, identificada por el parámetro `name` o `id` de la solicitud, respectivamente. Retorna un objeto JSON representando la pista eliminada si tiene éxito, o una respuesta de error si falla.

El enrutador depende del modelo `TrackModel` que se importa desde "../models/track.js", el cual se supone que define la estructura de datos para las pistas de la aplicación. Además, se utiliza el middleware `express.Router()` para definir las rutas de la aplicación.

El codigo del fichero user.ts es:

```ts
//sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/
/**

Router para manejar usuarios
@class
@typedef {import('express').Router} Router
@property {Router} userRouter - Router para manejar usuarios
*/
import express from "express";
import { UserModel } from "../models/user.js";

export const userRouter = express.Router();
/**

Crea un usuario nuevo
@name POST/users
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {Object} req.body - Objeto que contiene los datos del usuario
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene los datos del usuario creado
*/
userRouter.post("/users", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Obtiene la información de todos los usuarios o de un usuario en particular
@name GET/users
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {String} [req.query.name] - Nombre del usuario que se desea obtener
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene la información del usuario o usuarios
*/
userRouter.get("/users", async (req, res) => {
  const filter = req.query.name ? { name: req.query.name.toString() } : {};

  try {
    const users = await UserModel.findOne(filter);
    if (users) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Obtiene la información de un usuario en particular
@name GET/users/:id
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {String} req.params.id - ID del usuario que se desea obtener
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene la información del usuario
*/
userRouter.get("/users/:id", async (req, res) => {
  try {
    const users = await UserModel.findOne({
      id: req.params.id,
    });
    if (users) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Actualiza los datos de un usuario
@name PATCH/users
@function
@memberof userRouter
@param {Object} req - Objeto request de Express
@param {String} [req.query.name] - Nombre del usuario que se desea actualizar
@param {Object} req.body - Objeto que contiene los nuevos datos del usuario
@param {Object} res - Objeto response de Express
@returns {Object} Objeto que contiene la información del usuario actualizado
*/
userRouter.patch("/users", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({ error: "No name provided" });
  }

  const allowedUpdates = Object.keys(req.body);
  const actualUpdates = [
    "id",
    "name",
    "activity",
    "friends",
    "groups",
    "statistics",
    "favorite_tracks",
    "challenges",
    "history",
  ];

  const isValidOperation = actualUpdates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      {
        name: req.query.name.toString(),
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Patch a user with a given id.

@route PATCH /users/{id}

@param {string} id.path.required - The id of the user to patch.

@body {object} user - The updated user object.

@returns {object} 200 - The updated user.

@returns {Error} 404 - The user was not found.

@returns {Error} 500 - An error occurred while updating the user.
*/
userRouter.patch("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Delete a user with a given name.
@route DELETE /users
@queryparam {string} name - The name of the user to delete.
@returns {object} 200 - The deleted user.
@returns {Error} 400 - No name provided.
@returns {Error} 404 - The user was not found.
@returns {Error} 500 - An error occurred while deleting the user.
*/
userRouter.delete("/users", async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send();
  }
  try {
    const user = await UserModel.findOneAndDelete({
      name: req.query.name,
    });
    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**

Delete a user with a given id.
@route DELETE /users/{id}
@param {string} id.path.required - The id of the user to delete.
@returns {object} 200 - The deleted user.
@returns {Error} 404 - The user was not found.
@returns {Error} 500 - An error occurred while deleting the user.
*/
userRouter.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({
      id: req.params.id,
    });
    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
```

Este código es un router que maneja las operaciones CRUD (crear, leer, actualizar y eliminar) para usuarios utilizando una base de datos MongoDB. 

Primero, se importa el módulo express y el modelo de usuario definido en otro archivo. Luego se define el router de usuario utilizando la función `express.Router()`. 

A continuación, se definen varias rutas que manejan diferentes operaciones:

- POST/users: crea un nuevo usuario utilizando los datos proporcionados en `req.body`. Si se crea el usuario con éxito, se devuelve un objeto que contiene los datos del usuario creado. Si hay algún error, se devuelve un código de estado 500 con el error correspondiente.

- GET/users: obtiene la información de todos los usuarios o de un usuario en particular utilizando el parámetro `name` proporcionado en `req.query`. Si se encuentra el usuario o los usuarios con éxito, se devuelve un objeto que contiene la información de los usuarios. Si no se encuentra ningún usuario, se devuelve un código de estado 404.

- GET/users/:id: obtiene la información de un usuario en particular utilizando el parámetro `id` proporcionado en `req.params`. Si se encuentra el usuario con éxito, se devuelve un objeto que contiene la información del usuario. Si no se encuentra ningún usuario, se devuelve un código de estado 404.

- PATCH/users: actualiza los datos de un usuario utilizando el parámetro `name` proporcionado en `req.query` y los nuevos datos proporcionados en `req.body`. Si se actualiza el usuario con éxito, se devuelve un objeto que contiene los datos del usuario actualizado. Si hay algún error, se devuelve un código de estado 500 con el error correspondiente.

- PATCH/users/:id: actualiza los datos de un usuario utilizando el parámetro `id` proporcionado en `req.params` y los nuevos datos proporcionados en `req.body`. Si se actualiza el usuario con éxito, se devuelve un objeto que contiene los datos del usuario actualizado. Si hay algún error, se devuelve un código de estado 500 con el error correspondiente.

- DELETE/users: elimina un usuario utilizando el parámetro `name` proporcionado en `req.query`. Si se elimina el usuario con éxito, se devuelve un objeto que contiene los datos del usuario eliminado. Si hay algún error, se devuelve un código de estado 500 con el error correspondiente.

### Otros ficheros

El codigo del fichero app.ts es:

```ts
import express from "express";
import "./db/mongoose.js";
import { userRouter } from "./routers/user.js";
import { trackRouter } from "./routers/track.js";
import { groupRouter } from "./routers/group.js";
import { challengeRouter } from "./routers/challenge.js";
import { defaultRouter } from "./routers/default.js";

export const app = express();
app.use(express.json());
app.use(trackRouter);
app.use(userRouter);
app.use(groupRouter);
app.use(challengeRouter);
app.use(defaultRouter);
```

Este código importa el módulo `express` para crear una aplicación web y se utiliza para definir rutas en diferentes módulos. 

Luego, importa los siguientes módulos de ruta:

- `userRouter`: para definir las rutas de usuario.
- `trackRouter`: para definir las rutas de seguimiento.
- `groupRouter`: para definir las rutas de grupo.
- `challengeRouter`: para definir las rutas de desafío.
- `defaultRouter`: para definir las rutas predeterminadas.

Por último, se crea una instancia de la aplicación `express` y se utiliza el método `use()` para asociar cada uno de los enrutadores importados a la aplicación. Además, se utiliza el método `json()` de la instancia de `express` para analizar el cuerpo de las solicitudes entrantes como objetos JSON. 

En resumen, este código es una aplicación de servidor web que utiliza diferentes módulos de ruta para manejar las solicitudes entrantes en diferentes rutas.

El codigo del fichero index.ts es:

```ts
import { app } from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
```

El código importa la constante "app" desde el archivo "app.js", que es una instancia de la aplicación Express que se ha configurado con varios middlewares y enrutadores. Luego, se establece un valor para la variable "port" que se usará para escuchar las conexiones entrantes. Finalmente, la aplicación se inicia llamando al método "listen" en la instancia de "app", pasando el valor del puerto y una función de devolución de llamada que se ejecutará cuando la aplicación comience a escuchar conexiones entrantes. La función de devolución de llamada simplemente imprime un mensaje en la consola indicando que el servidor está en ejecución y en qué puerto está escuchando. En resumen, este código inicia la aplicación y la hace escuchar en un puerto determinado.

## Conclusion



## Referencias


