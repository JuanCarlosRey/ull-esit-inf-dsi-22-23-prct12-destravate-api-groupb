import { RegistroJSON } from "./../../src/modificacion/RegistroJSON.js";
import { Bolsa } from "./../../src/modificacion/bolsa.js";

import { readFile } from "fs";
import { expect } from "chai";

describe("RegistroJSON", () => {
  let registro: RegistroJSON;
  let bolsa: Bolsa;

  it("deberia procesar JSON de forma correcta", () => {
    const bolsa: Bolsa = { capacidad: 0, n_elementos: 0, elementos: [] };
    registro = new RegistroJSON(bolsa);
    registro.run();
  });
});
