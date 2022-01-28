import React, { useCallback, useState } from 'react';
import { Overview } from './overview/Overview';
import { Settings } from './settings/Settings';
import { Game } from './game/Game';

/**
 * This component is a wrapper which holds values which
 * @param holder
 * @returns
 */
const Middleman = function middleman(holder: {
  midiDevice: any,
  handlePhaseChange: any, phase: number,
  songNameArray: string[], songLengthArray: number[]
}) {
  const [restTime, setRestTime] = useState('0:00'); // like 3:40 -> 3:39 -> 3:38
  const [pastTime, setPastTime] = useState(0); // like 1 -> 2 -> 3 (seconds)
  const [totalSongLength, setTotalSongLength] = useState(0);
  const [gameStarted, setGameStarted] = useState(true);
  const [songChoice, setSongChoice] = useState('Choose a song and press start');

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

  return (
    <div>
      <Settings
        onGameStartChange={handleGameStartedChange}
        onSongChoiceChange={handleSongChoiceChange}
        onRestTimeChange={handleRestTimeChange}
        onPastTimeChange={handlePastTimeChange}
        onTotalSongLengthChange={handleTotalSongLengthChange}
        songNameArray={holder.songNameArray}
        onPhaseChange={holder.handlePhaseChange}
        songLengthArray={holder.songLengthArray}
        phase={holder.phase}
        songChoice={songChoice}
        isGameStarted={gameStarted}
      />
      <Overview
        phase={holder.phase}
        midiDevice={holder.midiDevice}
        gameStarted={gameStarted}
      />
      <Game
        songNameArray={holder.songNameArray}
        songLenghtArray={holder.songLengthArray}
        songChoice={songChoice}
        restTime={restTime}
        pastTime={pastTime}
        totalSongLength={totalSongLength}
      />
    </div>
  );
};

export { Middleman };
