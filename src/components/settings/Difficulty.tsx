import React, { useState } from 'react';

import '../css/Settings.css';

/**
 * Changes the difficulty of the song.
 * @param holder
 * @returns
 */
const Difficulty = function difficulty(holder: { gameStarted: boolean }) {
  /* Value of a slider */
  const [value, setValue] = useState(0.5);

  /* Disables a slider */
  let disableSlider = false;

  /* Will disable the slider if the game started. */
  if (holder.gameStarted === true) {
    disableSlider = true;
  } else {
    disableSlider = false;
  }

  /* Handles changes of a slider */
  function handleChange(event: any) {
    setValue(event.target.value);
  }

  return (
    <div className="difficultyComponent">
      Pace
      <div>
        <input type="range" onChange={handleChange} min="0" max="1" value={value} step="0.01" disabled={disableSlider} />
      </div>
    </div>
  );
};

export default Difficulty;
