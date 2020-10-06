import http from "http";
import express from "express";
import { compute } from "./compute";
import {Game} from "./types";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;

  if ( isValidGame(game) ) {
    const score:number = compute(game);
    response.status(200);
    response.json({ "score": score });
  } else {
    response.status(400);
    response.send("Invalid Game Input");
  }

});

function isValidGame(object:any) : boolean {
  if (
      Array.isArray(object)
      && object.length === 10
  ) {

    for ( let element of object ) {
      let lastElement = object[object.length - 1];

      if (
          Array.isArray(element)
          && ( element.length === 2 && element !== lastElement )
          || ( element.length === 3 && element === lastElement )
      ) {

        for ( let entry of element ) {
          if (
              typeof entry === "number"
              && entry >= 0
              && entry <=10
              && entry % 1 === 0
          ) {
          } else return false;
        }

        let sum = element.reduce( (a, b) => a + b, 0 );
        if (
            ( element !== lastElement && sum <= 10 )
            || (
                element === lastElement
                && ( element[0] !== 10 && (element[0] + element[1]) === 10 )
                || ( element[0] === 10 && sum <= 30 )
            )
        ) {} else return false;

      } else return false;

    }

  } else return false;

  return true
}

export const createServer = () => http.createServer(app);
