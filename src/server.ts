import { MongoClient } from "mongodb";
import { Track, Type, Coordinates } from "./classes/track.js";
import express from "express";

const app = express();

const dbURL = "mongodb://127.0.0.1:27017";
const dbName = "sport-app";

app.get("/tracks", (req, res) => {
  if(!req.query.name) {
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
      return db.collection<Track>(String(req.query.name)).find().toArray();
    }).then((result) => {
      res.send(JSON.stringify({ "type": "success", "output": result }) + "\n");
    }).catch((error) => {
      res.status(500).send(JSON.stringify({ "type": "error", "output": error }) + "\n");
    });

  }else if (!req.query.Id) {

    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
      return db.collection<Track>(String(req.query.Id)).find().toArray();
    }).then((result) => {
      res.send(JSON.stringify({ "type": "success", "output": result }) + "\n");
    }).catch((error) => {
      res.status(500).send(JSON.stringify({ "type": "error", "output": error }) + "\n");
    });

  }else {
    res.send(JSON.stringify({ "type": "error", "output": "no se ha provisto un elemento de bsuqueda " }) + "\n");
  }
});

app.post("/tracks", (req, res) => {
    if (!req.query.id) res.status(400).send(JSON.stringify({ "type": "error", "output": "id is required" }) + "\n");
    if (!req.query.name) res.status(400).send(JSON.stringify({ "type": "error", "output": "name is required" }) + "\n");
    if (!req.query.start) res.status(400).send(JSON.stringify({ "type": "error", "output": "start is required" }) + "\n");
    if (!req.query.end) res.status(400).send(JSON.stringify({ "type": "error", "output": "end is required" }) + "\n");
    if (!req.query.long) res.status(400).send(JSON.stringify({ "type": "error", "output": "long is required" }) + "\n");
    if (!req.query.grade) res.status(400).send(JSON.stringify({ "type": "error", "output": "grade is required" }) + "\n");
    if (!req.query.users) res.status(400).send(JSON.stringify({ "type": "error", "output": "users is required" }) + "\n");
    if (!req.query.type) res.status(400).send(JSON.stringify({ "type": "error", "output": "type is required" }) + "\n");
    if (!req.query.puntuation) res.status(400).send(JSON.stringify({ "type": "error", "output": "puntuation is required" }) + "\n");


    //crear objeto track con los datos del body
    //insertar en la base de datos
    //devolver el objeto creado



});

app.delete("/tracks", (req, res) => {
  if (req.query.id) {
    //eliminar el track con el id indicado
  }else if (req.query.name) {
    //eliminar el track con el nombre indicado
  }else {
    res.send(JSON.stringify({ "type": "error", "output": "no se ha provisto un elemento de bsuqueda " }) + "\n");
  }
});

app.patch("/tracks", (req, res) => {
  // Código
});

//----------------------------------------------------------
/*
app.get("/challenges", (req, res) => {})

app.post("/challenges", (req, res) => {})

app.delete("/challenges", (req, res) => {})

app.patch("/challenges", (req, res) => {})
*/
//----------------------------------------------------------
/*
app.get("/groups", (req, res) => {})

app.post("/groups", (req, res) => {})

app.delete("/groups", (req, res) => {})

app.patch("/groups", (req, res) => {})
*/
//----------------------------------------------------------
/*
app.get("/users", (req, res) => {})

app.post("/users", (req, res) => {})

app.delete("/users", (req, res) => {})

app.patch("/users", (req, res) => {})
*/
//----------------------------------------------------------

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});