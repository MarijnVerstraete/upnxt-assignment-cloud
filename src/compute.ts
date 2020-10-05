import {Game, LastFrame} from "./types";

export function compute(game: Game): number {
  let score:number = 0;

  for (let frame of game) {
    score += frame[0] + frame[1];
  }

  return score;
}
