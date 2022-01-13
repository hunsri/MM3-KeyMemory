import React, { useEffect, useState } from 'react';

import { WebMidi } from 'webmidi';

const MidiInputDisplay = function MidiInputDisplay() {
  const defaultInputDeviceIndex = 1;
  const [lastOn, setLastOn] = useState('');
  const [lastOff, setLastOff] = useState('');
  let inputDevice;

  function listenToNote() {
    inputDevice = WebMidi.inputs[defaultInputDeviceIndex];

    if (inputDevice !== null && inputDevice !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputDevice.addListener('noteon', (e: { note: { identifier: any; }; }) => {
        setLastOn(e.note.identifier);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputDevice.addListener('noteoff', (e: { note: { identifier: any; }; }) => {
        setLastOff(e.note.identifier);
      });
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
    <div>
      <p>
        {`NoteOn: ${lastOn}`}
      </p>
      <p>
        {`NoteOff: ${lastOff}`}
      </p>
    </div>
  );
};

export default MidiInputDisplay;
