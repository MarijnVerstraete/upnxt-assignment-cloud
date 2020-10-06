import http from "http";
import express from "express";
import { compute } from "./compute";
import {Frame, Game, LastFrame} from "./types";

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

//TODO make validation throw errors to catch in a try-catch, passing the error message in the body of the response
function isValidGame(object:Game) : boolean {
  return Array.isArray(object)
      && object.length === 10
      && framesAreArraysAndLengthsOk(object)
      && object.every(individualPinNumberOk)
      && object.every(totalNumberOfPinsOk);
}

function framesAreArraysAndLengthsOk (object) : boolean {
  const lastElement = object[object.length - 1];

  for ( let element of object ) {
    if ( ! (
        Array.isArray(element)
        && ( element.length === 2 && element !== lastElement )
        || ( element.length === 3 && element === lastElement )
    ) ) return false;
  }
  return true;
}

function individualPinNumberOk (frame: Frame | LastFrame) : boolean {
  return frame.every(isValidPinAmount);
}

function isValidPinAmount (amountOfPins) : boolean {
  return typeof amountOfPins === "number"
      && amountOfPins >= 0
      && amountOfPins <=10
      && amountOfPins % 1 === 0;
}


function totalNumberOfPinsOk(frame: Frame | LastFrame) : boolean {
  const sumOfPins = frame.reduce( (a, b) => a + b, 0 );

  if (frame.length === 2) {
    return sumOfPins <= 10;
  } else if (frame.length === 3 ) {
    return ( frame[0] !== 10 && (frame[0] + frame[1]) === 10 )
        || ( frame[0] === 10 && sumOfPins <= 30 );
  } else {
    return false;
  }
}


export const createServer = () => http.createServer(app);
