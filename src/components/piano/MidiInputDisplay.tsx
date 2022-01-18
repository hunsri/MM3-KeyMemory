import React, { useEffect } from 'react';
import { WebMidi } from 'webmidi';

import '../css/Piano.css';

const MidiInputDisplay = function MidiInputDisplay(holder: {
  onMidiDeviceChange: any
}) {
  let inputDevice;
  const defaultInputDeviceIndex = 1;

  function listenToNote() {
    inputDevice = WebMidi.inputs[defaultInputDeviceIndex];

    if (inputDevice !== null && inputDevice !== undefined) {
      holder.onMidiDeviceChange(inputDevice);
    }
  }

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
