import { Game } from "./types";

export function compute(game: Game): number {
  // TODO
  // console.log("Game = " + frame[0] + " | " + frame[1]);
  let score:number = 0;
  let wasSpare:boolean=false;
  let wasStrike:boolean=false;
  for (let frame of game) {
    //een speler krijgt zoizo de omgegooide kegels als score
    score += frame[0] + frame[1];
    //als 10 kegels worden omgegooid, krijgt de speler 1 of twee worpen dubbel.
    if(wasSpare) score += frame[0];
    if(wasStrike) score += frame[1];

    wasSpare = (frame[0] + frame[1]) == 10;
    wasStrike = frame[0] == 10;
  }

  return score;
  //throw new Error("Not yet implemented");
}
