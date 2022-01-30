import React from 'react';
import '../css/Game.css';

/**
 * Creates a timline of a song.
 * @param holder
 * @returns
 */
const Timeline = function timeline(holder: { totalSongLength: number, pastLenght: number }) {
  return (
    <div>
      <input className="songSlider" type="range" min="0" max={`${holder.totalSongLength}`} value={`${holder.pastLenght}`} step="1" />
    </div>
  );
};

export default Timeline;
