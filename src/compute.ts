import { Game } from "./types";

export function compute(game: Game): number {
  // TODO
  var score:number;
  score = game[0][0] + game[0][1];
  return score;
  //throw new Error("Not yet implemented");

}
