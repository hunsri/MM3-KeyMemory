import React, { useEffect } from 'react';
import { WebMidi } from 'webmidi';

import '../css/Piano.css';

const MidiInputDisplay = function MidiInputDisplay(holder: {
  onInputDeviceChange: any
}) {
  const defaultInputDeviceIndex = 1;
  let inputDevice;

  function listenToNote() {
    inputDevice = WebMidi.inputs[defaultInputDeviceIndex];

    if (inputDevice !== null && inputDevice !== undefined) {
      holder.onInputDeviceChange(inputDevice);
      /*
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputDevice.addListener('noteon', (e: { note: { identifier: any; }; }) => {
        holder.onLastOnChange(e.note.identifier);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputDevice.addListener('noteoff', (e: { note: { identifier: any; }; }) => {
        holder.onLastOffChange(e.note.identifier);
      });
      */
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

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return (
    <div />
  );
};

export default MidiInputDisplay;
