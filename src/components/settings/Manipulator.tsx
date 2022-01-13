import React from 'react';
import '../css/Settings.css';

/**
 * Creates sliders to manipulate the audio.
 * @param holder
 * @returns
 */
const Manipulator = function manipulator(holder: { title: string, id: string}) {
  return (
    <div className="volumeComponent">
      {holder.title}
      <div>
        <input type="range" id={holder.id} min="0" max="1" value="0.5" step="0.01" />
      </div>
    </div>
  );
};

export default Manipulator;
