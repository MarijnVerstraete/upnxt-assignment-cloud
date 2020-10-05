import {Frame, Game, LastFrame} from "./types";

export function compute(game: Game): number {
  let score:number = 0;

  //procces first 9 frames
  for (var i = 0; i < 9; i++) {
    let currentFrame = game[i];
    let nextFrame = game[i+1];
    score += currentFrame[0] + currentFrame[1];
    if( isStrike( currentFrame ) ) {
      //count the nextframe
      score += nextFrame[0] + nextFrame[1];

      //if the next is also a strike, count the second next frame first roll
      //check if the next frame is not length 3, so it doesnt give nulpointer searching for game index 10
      if ( isStrike(nextFrame) && nextFrame.length < 3 ) {
        score += game[i+2][0];
      }

      //else if not a strike but a spare, count the next roll
    } else if ( isSpare(currentFrame) ) {
      score += nextFrame[0];
    }
  }
  //process last frame
  let lastFrame:LastFrame = game[9];
  for ( let number of lastFrame ) {
    score += number;
  }

  return score;
}

function isStrike (frame: Frame | LastFrame): boolean {
  return frame[0] === 10;
}

function isSpare (frame: Frame | LastFrame): boolean {
  return ( frame[0] + frame[1] ) === 10;
}
