import React, { useState, useCallback } from 'react';
import Key from './Key';
import MidiInputDisplay from './MidiInputDisplay';

import '../css/Piano.css';

/**
 * A digital Pino.
 * @returns
 */
const Piano = function piano(holder: { onMidiDeviceChange: any }) {
  const [inputDevice, setInputDevice] = useState(null);

  const handleInputDeviceChange = useCallback((changeInputDevice: any) => {
    setInputDevice(changeInputDevice);
    holder.onMidiDeviceChange(changeInputDevice);
  }, [setInputDevice]);

  return (
    <div id="piano" className="piano">
      <Key keyLetter="C" keyNumber="4" keyboard="q" alternative="1" inputDevice={inputDevice} />
      <Key keyLetter="D" keyNumber="4" keyboard="w" alternative="2" inputDevice={inputDevice} />
      <Key keyLetter="E" keyNumber="4" keyboard="e" alternative="" inputDevice={inputDevice} />
      <Key keyLetter="F" keyNumber="4" keyboard="r" alternative="3" inputDevice={inputDevice} />
      <Key keyLetter="G" keyNumber="4" keyboard="t" alternative="4" inputDevice={inputDevice} />
      <Key keyLetter="A" keyNumber="4" keyboard="z" alternative="5" inputDevice={inputDevice} />
      <Key keyLetter="B" keyNumber="4" keyboard="u" alternative="" inputDevice={inputDevice} />

      <Key keyLetter="C" keyNumber="5" keyboard="a" alternative="6" inputDevice={inputDevice} />
      <Key keyLetter="D" keyNumber="5" keyboard="s" alternative="7" inputDevice={inputDevice} />
      <Key keyLetter="E" keyNumber="5" keyboard="d" alternative="" inputDevice={inputDevice} />
      <Key keyLetter="F" keyNumber="5" keyboard="f" alternative="8" inputDevice={inputDevice} />
      <Key keyLetter="G" keyNumber="5" keyboard="g" alternative="9" inputDevice={inputDevice} />
      <Key keyLetter="A" keyNumber="5" keyboard="h" alternative="0" inputDevice={inputDevice} />
      <Key keyLetter="B" keyNumber="5" keyboard="j" alternative="" inputDevice={inputDevice} />

      <p id="hintText">Press x to see which keys you need to press and c to hide it.</p>
      <MidiInputDisplay onInputDeviceChange={handleInputDeviceChange} />
    </div>
  );
};

export { Piano };
