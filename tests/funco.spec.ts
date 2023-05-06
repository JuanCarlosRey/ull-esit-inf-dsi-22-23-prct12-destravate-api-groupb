import "mocha";
import { expect } from "chai";

import { Tipo } from "./../src/tipo.js";
import { Genero } from "./../src/genero.js";
import { Funko } from "./../src/funco.js";

describe("Funko", () => {
  let funko: Funko;

  beforeEach(() => {
    funko = new Funko(
      1,
      "Harry Potter",
      "Funko de Harry Potter",
      Tipo.POP,
      Genero.ANIMACION,
      "Harry Potter",
      1,
      true,
      "Cicatriz en forma de rayo",
      1000
    );
  });

  it("deberia crear una instancia", () => {
    expect(funko).to.exist;
  });

  it("debería tener una id valida", () => {
    expect(funko.id_).to.be.equal(1);
  });

  it("debería tener un nombre correcto", () => {
    expect(funko.nombre_).to.be.equal("Harry Potter");
  });

  it("debería tener una descripcion valida", () => {
    expect(funko.descripcion_).to.be.equal("Funko de Harry Potter");
  });

  it("debería tener un tipo correcto", () => {
    expect(funko.tipo_).to.deep.equal(Tipo.POP);
  });

  it("debería tener un genero correcto", () => {
    expect(funko.genero_).to.be.equal(Genero.ANIMACION);
  });

  it("debería tener una franquicia correcta", () => {
    expect(funko.franquicia_).to.be.equal("Harry Potter");
  });

  it("debería tener nu numero correcto", () => {
    expect(funko.numero_).to.be.equal(1);
  });

  it("debería tener una exclusividad correcta", () => {
    expect(funko.exclusivo_).to.be.true;
  });

  it("debería tener características especiales correctas", () => {
    expect(funko.caracteristicasEspeciales_).to.be.equal(
      "Cicatriz en forma de rayo"
    );
  });

  it("debería tener un valor de mercado valido", () => {
    expect(funko.valorDeMercado_).to.be.equal(1000);
  });

  it("debería cambiar la id", () => {
    funko.id_ = 2;
    expect(funko.id_).to.be.equal(2);
  });

  it("debería cambiar el nombre", () => {
    funko.nombre_ = "Ron Weasley";
    expect(funko.nombre_).to.be.equal("Ron Weasley");
  });

  it("debería cambiar la descripcion", () => {
    funko.descripcion_ = "Funko de Ron Weasley";
    expect(funko.descripcion_).to.be.equal("Funko de Ron Weasley");
  });

  it("debería cambiar el tipo", () => {
    funko.tipo_ = Tipo.POP_RIDES;
    expect(funko.tipo_).to.be.equal(Tipo.POP_RIDES);
  });

  it("debería cambiar el genero", () => {
    funko.genero_ = Genero.ANIME;
    expect(funko.genero_).to.be.equal(Genero.ANIME);
  });

  it("debería cambiar al frannquicia", () => {
    funko.franquicia_ = "Animales fantásticos";
    expect(funko.franquicia_).to.be.equal("Animales fantásticos");
  });

  it("debería cambiar el numero", () => {
    funko.numero_ = 2;
    expect(funko.numero_).to.be.equal(2);
  });

  it("debería cambiar la exclusividad", () => {
    funko.exclusivo_ = false;
    expect(funko.exclusivo_).to.be.false;
  });

  it("debería cambiar las características especiales", () => {
    funko.caracteristicasEspeciales_ = "Varita mágica";
    expect(funko.caracteristicasEspeciales_).to.be.equal("Varita mágica");
  });

  it("debería cambiar el valor del mercado", () => {
    funko.valorDeMercado_ = 500;
    expect(funko.valorDeMercado_).to.be.equal(500);
  });
});
