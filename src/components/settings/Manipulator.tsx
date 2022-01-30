/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import '../css/Settings.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Tone = require('tone');

/**
 * Creates sliders to manipulate the audio.
 * @param holder
 * @returns
 */
const Manipulator = function manipulator(holder: { title: string, id: string, audioOutput: any}) {
  /* Value of a slider */
  // const [value, setValue] = useState(0.5);
  const [value, setValue] = useState(holder.audioOutput.volume.value);

  /* Disables Audio */
  const [isMuted, setIsMuted] = useState(false);

  let volumeBeforeMute = 0;
  const mutedVolume = -100000;

  /* Handles changes of a slider */
  function handleChange(event: any) {
    setValue(event.target.value);

    // eslint-disable-next-line no-param-reassign
    holder.audioOutput.volume.value = value;
  }

  /* Changes isMuted when button "Mute" is clicked */
  function handleOnClick() {
    if (isMuted) {
      setIsMuted(false);
      holder.audioOutput.volume.value = volumeBeforeMute;
    } else {
      setIsMuted(true);
      volumeBeforeMute = holder.audioOutput.volume.value;
      holder.audioOutput.volume.value = mutedVolume;
    }
  }

  return (
    <div className="volumeComponent">
      {holder.title}
      <div>
        <input type="range" id={holder.id} onChange={handleChange} min="-10" max="10" value={value} step="0.01" disabled={isMuted} />
        <button type="submit" id={`${holder.id}Button`} className="muteButton" onClick={handleOnClick}>Mute</button>
      </div>
    </div>
  );
};

export default Manipulator;
