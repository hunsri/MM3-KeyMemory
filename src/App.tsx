import React, { useCallback, useState } from 'react';
import { Piano } from './components/piano/Piano';
import { Pianoroll } from './components/pianoRoll/Pianoroll';
import { Middleman } from './components/Middleman';

const App = function app() {
  const songNameArray = ['Die Lilie', 'Für die Liebe'];
  const songLengthArray = [10, 253];
  const [gameStarted, setGameStarted] = useState(true);
  const [songChoice, setSongChoice] = useState('Choose a song and press start');
  const [phase, setPhase] = useState(0);
  const [midiDevice, setMidiDevice] = useState();

  // All const below are callbacks of children of this class (App.tsx).
  // Updates the gameStarted boolean.
  const handleGameStartedChange = useCallback((changeGameStarted: boolean) => {
    setGameStarted(changeGameStarted);
  }, [setGameStarted]);

  // Updates the songChoice string.
  const handleSongChoiceChange = useCallback((changeSongChoice: string) => {
    setGameStarted(false);
    setSongChoice(changeSongChoice);
  }, [setSongChoice]);

  // Updates the phase number.
  const handlePhaseChange = useCallback((changePhase: number) => {
    setPhase(changePhase);
  }, [setPhase]);

  // Updates the phase number.
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
          handleMidiDeviceChange={handlePhaseChange}
          handleGameStartedChange={handleGameStartedChange}
          handlePhaseChange={handlePhaseChange}
          handleSongChoiceChange={handleSongChoiceChange}
          songChoice={songChoice}
          gameStarted={gameStarted}
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
