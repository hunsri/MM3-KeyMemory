import React, { useCallback, useState } from 'react';
import { Overview } from './components/overview/Overview';
import { Piano } from './components/piano/Piano';
import { Settings } from './components/settings/Settings';
import { Game } from './components/game/Game';

const App = function app() {
  const songNameArray = ['Die Lilie', 'Für die Liebe'];
  const songLengthArray = [10, 253];
  const [gameStarted, setGameStarted] = useState(true);
  const [songChoice, setSongChoice] = useState('Choose a song and press start');
  const [restTime, setRestTime] = useState('0:00'); // like 3:40 -> 3:39 -> 3:38
  const [pastTime, setPastTime] = useState(0); // like 1 -> 2 -> 3 (seconds)
  const [totalSongLength, setTotalSongLength] = useState(0);
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

  // Updates the restTime string.
  const handleRestTimeChange = useCallback((changeRestTime: string) => {
    setRestTime(changeRestTime);
  }, [setRestTime]);

  // Updates the pastTime number.
  const handlePastTimeChange = useCallback((changePastTime: number) => {
    setPastTime(changePastTime);
  }, [setPastTime]);

  // Updates the totalSongLength number.
  const handleTotalSongLengthChange = useCallback((changeTotalSongLength: number) => {
    setTotalSongLength(changeTotalSongLength);
  }, [setTotalSongLength]);

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
        <Settings
          songNameArray={songNameArray}
          onGameStartChange={handleGameStartedChange}
          onSongChoiceChange={handleSongChoiceChange}
          onRestTimeChange={handleRestTimeChange}
          onPastTimeChange={handlePastTimeChange}
          onTotalSongLengthChange={handleTotalSongLengthChange}
          onPhaseChange={handlePhaseChange}
          songChoice={songChoice}
          songLengthArray={songLengthArray}
          isGameStarted={gameStarted}
        />
        <Overview
          gameStarted={gameStarted}
          phase={phase}
          midiDevice={midiDevice}
        />
        <Game
          songNameArray={songNameArray}
          songLenghtArray={songLengthArray}
          songChoice={songChoice}
          restTime={restTime}
          pastTime={pastTime}
          totalSongLength={totalSongLength}
          phase={phase}
          inputDevice={midiDevice}
        />
      </body>
    </div>
  );
};

export default App;
