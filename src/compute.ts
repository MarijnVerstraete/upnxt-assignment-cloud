import {Frame, Game, LastFrame} from "./types";

//TODO make this an iterable foreach with a scoreFrame function
export function compute ( game: Game ): number {
  let score: number = 0;

  for ( let i = 0 ; i < 10 ; i++ ) {
    let currentFrame = game[i];
    score += currentFrame.reduce( (a, b) => a + b, 0);
    if (currentFrame.length === 3) break;
    let nextFrame = game[i+1];

    if ( isStrike(currentFrame) ) {
      score += nextFrame[0] + nextFrame[1];

      if ( isStrike(nextFrame) && nextFrame.length === 2 ) {
        score += game[i+2][0];
      }

    } else if ( isSpare(currentFrame) ) {
      score += nextFrame[0];
    }
  }

  return score;
}

function isStrike (frame: Frame | LastFrame): boolean {
  return frame[0] === 10;
}

function isSpare (frame: Frame | LastFrame): boolean {
  return frame[0] !== 10 && ( frame[0] + frame[1] ) === 10;
}
