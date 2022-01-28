import React, { useCallback, useState } from 'react';
import { Piano } from './components/piano/Piano';
import { Pianoroll } from './components/pianoRoll/Pianoroll';
import { Middleman } from './components/Middleman';

const App = function app() {
  const songNameArray = ['Die Lilie', 'Für die Liebe'];
  const songLengthArray = [10, 253];
  const [phase, setPhase] = useState(0); // 0 = Game didn't start / 1 = listen phase / 2 = your turn phase
  const [midiDevice, setMidiDevice] = useState();

  // All const below are callbacks of children of this class (App.tsx).
  // Updates the phase number.
  const handlePhaseChange = useCallback((changePhase: number) => {
    setPhase(changePhase);
  }, [setPhase]);

  // Updates the midi device.
  const handleMidiDeviceChange = useCallback((changeMidiDevice: any) => {
    setMidiDevice(changeMidiDevice);
  }, [setMidiDevice]);

  return (
    <div className="App">
      <body>
        <Piano
          onMidiDeviceChange={handleMidiDeviceChange}
          inputDevice={midiDevice}
        />
        <Middleman
          handlePhaseChange={handlePhaseChange}
          songNameArray={songNameArray}
          songLengthArray={songLengthArray}
          phase={phase}
          midiDevice={midiDevice}
        />
        <Pianoroll
          phase={phase}
          inputDevice={midiDevice}
        />
      </body>
    </div>
  );
};

export default App;
