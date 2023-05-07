import { MongoClient } from "mongodb";
import { Track, TYPE, coordenadas } from "./track/track.js";
import express from "express";

const app = express();

const dbURL = "mongodb://127.0.0.1:27017";
const dbName = "sport-app";

app.get("/tracks", (req, res) => {
  if (!req.query.id)
    res
      .status(400)
      .send(JSON.stringify({ type: "error", output: "id is required" }) + "\n");

  MongoClient.connect(dbURL)
    .then((client) => {
      const db = client.db(dbName);

      return db.collection<Track>(String(req.query.id)).findOne({
        _trackId: Number(req.query.id),
      });
    })
    .then((result) => {
      if (result != null) {
        res.send(JSON.stringify({ type: "success", output: result }) + "\n");
      } else {
        res
          .status(500)
          .send(
            JSON.stringify({ type: "error", output: "track not found" }) + "\n"
          );
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send(JSON.stringify({ type: "error", output: error }) + "\n");
    });
});

// app.post("/tracks", (req, res) => {
//   if (!req.query.id)
//     res
//       .status(400)
//       .send(JSON.stringify({ type: "error", output: "id is required" }) + "\n");
//   if (!req.query.name)
//     res
//       .status(400)
//       .send(
//         JSON.stringify({ type: "error", output: "name is required" }) + "\n"
//       );
//   if (!req.query.start)
//     res
//       .status(400)
//       .send(
//         JSON.stringify({ type: "error", output: "start is required" }) + "\n"
//       );
//   if (!req.query.end)
//     res
//       .status(400)
//       .send(
//         JSON.stringify({ type: "error", output: "end is required" }) + "\n"
//       );
//   if (!req.query.long)
//     res
//       .status(400)
//       .send(
//         JSON.stringify({ type: "error", output: "long is required" }) + "\n"
//       );
//   if (!req.query.grade)
//     res
//       .status(400)
//       .send(
//         JSON.stringify({ type: "error", output: "grade is required" }) + "\n"
//       );
//   if (!req.query.type)
//     res
//       .status(400)
//       .send(
//         JSON.stringify({ type: "error", output: "type is required" }) + "\n"
//       );
//   if (!req.query.puntuation)
//     res
//       .status(400)
//       .send(
//         JSON.stringify({ type: "error", output: "puntuation is required" }) +
//           "\n"
//       );

//   MongoClient.connect(dbURL).then((client) => {
//     const db = client.db(dbName);

//     return db.collection<Track>(String(req.query.id)).insertOne(track);
//   });
// });
