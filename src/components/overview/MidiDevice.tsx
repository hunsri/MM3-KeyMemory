import React from 'react';

import '../css/Overview.css';

/**
 * Shows if a MIDI device can be is accessible.
 * @param holder
 * @returns
 */
const MidiDevice = function midiDevice(holder: { isDeviceAccessible: any }) {
  /* Boolean to change the color of div "midiAccessibility" */
  let isAccessible = false;

  /* Changes the color of the div midiAccessibility. */
  if (holder.isDeviceAccessible !== null && holder.isDeviceAccessible !== undefined) {
    // console.log('Is accessible');
    isAccessible = true;
  } else {
    isAccessible = false;
  }

  return (
    <div id="midiDeviceComponent">
      MIDI Accessibility
      <div id="midiAccessibility" style={{ backgroundColor: isAccessible ? 'green' : 'red' }} />
    </div>
  );
};

export default MidiDevice;
