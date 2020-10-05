import http from "http";
import express from "express";
import { compute } from "./compute";
import {Game} from "./types";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game: Game = request.body.game;
  // TODO: Validate input

  const score = compute(game);

  // console.log("Score thats computed= " + score);
  //everything ok, return the score in json format
  response.status(200);
  response.json({ "score": score });
});

export const createServer = () => http.createServer(app);
