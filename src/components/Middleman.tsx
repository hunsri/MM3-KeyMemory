import React, { useCallback, useState } from 'react';
import { Overview } from './overview/Overview';
import { Settings } from './settings/Settings';
import { Game } from './game/Game';

const Middleman = function middleman(holder: {
  handleMidiDeviceChange: any, midiDevice: any,
  handlePhaseChange: any, phase: number,
  handleGameStartedChange: any, gameStarted: boolean,
  songNameArray: string[], songLengthArray: number[],
  handleSongChoiceChange: any, songChoice: string
}) {
  const [restTime, setRestTime] = useState('0:00'); // like 3:40 -> 3:39 -> 3:38
  const [pastTime, setPastTime] = useState(0); // like 1 -> 2 -> 3 (seconds)
  const [totalSongLength, setTotalSongLength] = useState(0);

  // All const below are callbacks of children of this class (App.tsx).
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
        songNameArray={holder.songNameArray}
        onGameStartChange={holder.handleGameStartedChange}
        onSongChoiceChange={holder.handleSongChoiceChange}
        onRestTimeChange={handleRestTimeChange}
        onPastTimeChange={handlePastTimeChange}
        onTotalSongLengthChange={handleTotalSongLengthChange}
        onPhaseChange={holder.handlePhaseChange}
        songChoice={holder.songChoice}
        songLengthArray={holder.songLengthArray}
        isGameStarted={holder.gameStarted}
      />
      <Overview
        gameStarted={holder.gameStarted}
        phase={holder.phase}
        midiDevice={holder.midiDevice}
      />
      <Game
        songNameArray={holder.songNameArray}
        songLenghtArray={holder.songLengthArray}
        songChoice={holder.songChoice}
        restTime={restTime}
        pastTime={pastTime}
        totalSongLength={totalSongLength}
      />
    </div>
  );
};

export { Middleman };
