import fs from "fs";
import path from "path";
import chalk from "chalk";
import { FuncosCollection } from "./../src/funkoCollection.js";
import { Funko } from "./../src/funco.js";
import { funko1, funko2, funko3, funko4 } from "./../src/main.js";
import { expect } from "chai";

/**
 * antes de ejecutar los test se bede borrar el directorio funkos, si existe el porcentaje de exito es menor
 */
describe("FuncosCollection", () => {
  it("debe listar los funkos de un usuario", () => {
    new FuncosCollection().almacenarFunkoUsuario(funko2, "John Doe");
    new FuncosCollection().almacenarFunkoUsuario(funko3, "John Doe");
    new FuncosCollection().almacenarFunkoUsuario(funko4, "John Doe");
    new FuncosCollection().almacenarFunkoUsuario(funko1, "John Doe");
    expect(new FuncosCollection().listarFunkosUsuario("John Doe")).to.be.true;
  });

  it("No debe listar los funkos de un usuario", () => {
    expect(new FuncosCollection().listarFunkosUsuario("John Does")).to.be.false;
  });

  it("debe mostrar un funko de un usuario", () => {
    expect(new FuncosCollection().mostrarFunkoUsuario(1, "John Doe")).to.be
      .true;
    expect(new FuncosCollection().mostrarFunkoUsuario(2, "John Doe")).to.be
      .true;
    expect(new FuncosCollection().mostrarFunkoUsuario(3, "John Doe")).to.be
      .true;
    expect(new FuncosCollection().mostrarFunkoUsuario(4, "John Doe")).to.be
      .true;
  });

  it("No debe mostrar un funko de un usuario", () => {
    expect(new FuncosCollection().mostrarFunkoUsuario(1, "John Does")).to.be
      .false;
  });

  it("debe eliminar un funko de un usuario", () => {
    expect(new FuncosCollection().eliminarFunkoUsuario(1, "John Doe")).to.be
      .true;
    expect(new FuncosCollection().eliminarFunkoUsuario(2, "John Doe")).to.be
      .true;
    expect(new FuncosCollection().eliminarFunkoUsuario(3, "John Doe")).to.be
      .true;
    expect(new FuncosCollection().eliminarFunkoUsuario(4, "John Doe")).to.be
      .true;
  });

  it("No debe eliminar un funko de un usuario", () => {
    expect(new FuncosCollection().eliminarFunkoUsuario(1, "John Does")).to.be
      .false;
  });

  it("debe crear un archivo con la identificación de funko y el directorio de usuario dados", () => {
    const usuario = "John Doe";
    const fileName = funko1.id + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;
    new FuncosCollection().almacenarFunkoUsuario(funko1, usuario);

    expect(fs.existsSync(filePath)).to.be.true;
  });

  it("debe cargar los funkos de un usuario", () => {
    expect(new FuncosCollection().cargarFunkosUsuario("John Doe"))
      .to.deep.be.an("array")
      .that.includes(funko1);
  });

  it("debe cargar los funkos de un usuario", () => {
    expect(
      new FuncosCollection().cargarFunkosUsuario("John Does")
    ).to.deep.equal([]);
  });

  it("no debe crear un archivo si el archivo ya existe", () => {
    const usuario = "John Doe";
    const fileName = funko1.id + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    fs.writeFileSync(filePath, JSON.stringify(funko1));

    new FuncosCollection().almacenarFunkoUsuario(funko1, usuario);

    expect(fs.existsSync(filePath)).to.be.true;
  });

  it("debe eliminar un archivo con la identificación de funko y el directorio de usuario dados", () => {
    const id = 1;
    const usuario = "John Doe";
    const fileName = id.toString() + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    fs.writeFileSync(filePath, "data");

    new FuncosCollection().eliminarFunkoUsuario(id, usuario);

    expect(fs.existsSync(filePath)).to.be.false;
  });

  it("debe registrar un mensaje de error si el archivo no se puede eliminar", () => {
    const id = 2;
    const usuario = "John Doe";
    const fileName = id.toString() + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    new FuncosCollection().eliminarFunkoUsuario(id, usuario);

    expect(fs.existsSync(filePath)).to.be.false;
  });

  it("debe modificar un archivo existente con la identificación de funko y el directorio de usuario dados", () => {
    const id = 1;
    const usuario = "John Doe";
    const fileName = id.toString() + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    fs.writeFileSync(
      filePath,
      JSON.stringify({ id: 1, nombre: "Funko Original" })
    );

    // New content for the modified file
    const nuevoFunko = funko3;
    const nuevoContenido = JSON.stringify(nuevoFunko);

    // Act
    new FuncosCollection().modificarFunkoUsuario(id, nuevoFunko, usuario);

    // Assert
    const fileContent = fs.readFileSync(filePath, "utf8");
    expect(fileContent).to.equal(nuevoContenido);
  });

  it("debe registrar un mensaje de error si el archivo no existe", () => {
    const id = 2;
    const usuario = "John Doe";
    new FuncosCollection().modificarFunkoUsuario(id, funko4, usuario);
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${id.toString()}.json`;
    expect(fs.existsSync(filePath)).to.be.false;
  });
});
