import React from 'react';
import Key from './Key';
import MidiInputDisplay from './MidiInputDisplay';

import '../css/Piano.css';

/**
 * A digital Pino.
 * @returns
 */
const Piano = function piano(holder: { onMidiDeviceChange: any, inputDevice: any }) {
  return (
    <div id="piano" className="piano">
      <Key keyLetter="C" keyNumber="3" keyboard="q" alternative="1" inputDevice={holder.inputDevice} />
      <Key keyLetter="D" keyNumber="3" keyboard="w" alternative="2" inputDevice={holder.inputDevice} />
      <Key keyLetter="E" keyNumber="3" keyboard="e" alternative="" inputDevice={holder.inputDevice} />
      <Key keyLetter="F" keyNumber="3" keyboard="r" alternative="3" inputDevice={holder.inputDevice} />
      <Key keyLetter="G" keyNumber="3" keyboard="t" alternative="4" inputDevice={holder.inputDevice} />
      <Key keyLetter="A" keyNumber="3" keyboard="z" alternative="5" inputDevice={holder.inputDevice} />
      <Key keyLetter="B" keyNumber="3" keyboard="u" alternative="" inputDevice={holder.inputDevice} />

      <Key keyLetter="C" keyNumber="4" keyboard="a" alternative="6" inputDevice={holder.inputDevice} />
      <Key keyLetter="D" keyNumber="4" keyboard="s" alternative="7" inputDevice={holder.inputDevice} />
      <Key keyLetter="E" keyNumber="4" keyboard="d" alternative="" inputDevice={holder.inputDevice} />
      <Key keyLetter="F" keyNumber="4" keyboard="f" alternative="8" inputDevice={holder.inputDevice} />
      <Key keyLetter="G" keyNumber="4" keyboard="g" alternative="9" inputDevice={holder.inputDevice} />
      <Key keyLetter="A" keyNumber="4" keyboard="h" alternative="0" inputDevice={holder.inputDevice} />
      <Key keyLetter="B" keyNumber="4" keyboard="j" alternative="" inputDevice={holder.inputDevice} />

      <p id="hintText">Press x to see which keys you need to press and c to hide it.</p>
      <MidiInputDisplay onMidiDeviceChange={holder.onMidiDeviceChange} />
    </div>
  );
};

export { Piano };
