import { RegistroCSV } from "./../../src/modificacion/RegistroCSV.js";
import { Bolsa } from "./../../src/modificacion/bolsa.js";

import { readFile } from "fs";
import { expect } from "chai";

describe("RegistroCSV", () => {
  let registro: RegistroCSV;
  let bolsa: Bolsa;

  it("deberia procesar JSON de forma correcta", () => {
    const bolsa: Bolsa = { capacidad: 0, n_elementos: 0, elementos: [] };
    registro = new RegistroCSV(bolsa);
    registro.run();
  });
});
