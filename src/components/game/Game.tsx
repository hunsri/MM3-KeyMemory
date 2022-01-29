import React from 'react';
import Timeline from './Timeline';

import '../css/Game.css';

/**
 * Displays the song and his information.
 * For example showing his length and name.
 * @param holder
 * @returns
 */
const Game = function game(holder: {
  songChoice: string, pastTime: number,
  restTime: string, totalSongLength: number
}) {
  return (
    <div id="core" className="core">
      <p id="songName">{holder.songChoice}</p>
      <div id="timeline">
        <p id="timelineLength">{holder.restTime}</p>
        <Timeline totalSongLength={holder.totalSongLength} pastLenght={holder.pastTime} />
      </div>
    </div>
  );
};

export { Game };
