import React from 'react';
import '../css/Game.css';

/**
 * Creates a timline of a song.
 * @param holder got the name of a song and the lenght in it.
 * @returns
 */
const Timeline = function timeline(holder: { songName: string, totalSongLength: number, pastLenght: number }) {
  const sliderID = `${holder.songName}${'Slider'}`;

  return (
    <div>
      <input className="songSlider" id={sliderID} type="range" min="0" max={`${holder.totalSongLength}`} value={`${holder.pastLenght}`} step="1" />
    </div>
  );
};

export default Timeline;
