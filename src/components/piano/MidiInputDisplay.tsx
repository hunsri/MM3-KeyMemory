import React, { useEffect } from 'react';
import { WebMidi } from 'webmidi';

import '../css/Piano.css';

/**
 * Handles if a MIDI device is connected to the computer.
 * @param holder
 * @returns
 */
const MidiInputDisplay = function MidiInputDisplay(holder: { onMidiDeviceChange: any }) {
  /* Holds the MIDI device */
  let inputDevice;

  /* First MIDI device we find */
  const defaultInputDeviceIndex = 1;

  /**
   * Saves the MIDI device through a callback in our application.
   */
  function listenToNote() {
    inputDevice = WebMidi.inputs[defaultInputDeviceIndex];

    if (inputDevice !== null && inputDevice !== undefined) {
      holder.onMidiDeviceChange(inputDevice);
    }
  }

  /**
   * Starts the search for a MIDI device.
   */
  function startUp() {
    listenToNote();
  }

  useEffect(() => {
    // Runs after the first render() lifecycle
    WebMidi
      .enable()
      .then(() => startUp())
      // eslint-disable-next-line no-alert
      .catch((err) => alert(err));
  }, []);

  return (
    <div />
  );
};

export default MidiInputDisplay;
