import React from 'react';

const InputHandler = function inputHandler(holder: { inputDevice: any, onMidiEventChange: any }) {
  function createEvents(midiIsActive: boolean) {
    if (midiIsActive) {
      holder.inputDevice.addListener('noteon', (e: { note: { identifier: any; }; }) => {
        holder.onMidiEventChange(e);
      });

      holder.inputDevice.addListener('noteoff', (e: { note: { identifier: any; }; }) => {
        holder.onMidiEventChange(e);
      });
    }
  }

  if (holder.inputDevice !== null && holder.inputDevice !== undefined) {
    console.log('MIDI Device linked');
    createEvents(true);
  } else {
    console.log('No MIDI Device detected');
    createEvents(false);
  }

  return (
    <div />
  );
};

export default InputHandler;
