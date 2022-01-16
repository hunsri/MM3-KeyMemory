import React from 'react';

import '../css/Settings.css';

/**
 * Changes the difficulty of the song.
 * @param holder
 * @returns
 */
const Difficulty = function difficulty(holder: { gameStarted: boolean }) {
  let disableSlider = false;

  // Will disable the slider if the game started.
  if (holder.gameStarted === true) {
    disableSlider = true;
  } else {
    disableSlider = false;
  }

  return (
    <div className="difficultyComponent">
      Pace
      <div>
        <input type="range" min="0" max="1" value="0.5" step="0.01" disabled={disableSlider} />
      </div>
    </div>
  );
};

export default Difficulty;
