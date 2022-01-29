import React, { useState } from 'react';

import '../css/Settings.css';

/**
 * Creates sliders to manipulate the audio.
 * @param holder
 * @returns
 */
const Manipulator = function manipulator(holder: { title: string, id: string}) {
  /* Value of a slider */
  const [value, setValue] = useState(0.5);

  /* Handles changes of a slider */
  function handleChange(event: any) {
    setValue(event.target.value);
  }

  return (
    <div className="volumeComponent">
      {holder.title}
      <div>
        <input type="range" id={holder.id} onChange={handleChange} min="0" max="1" value={value} step="0.01" />
      </div>
    </div>
  );
};

export default Manipulator;
