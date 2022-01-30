import React, { useState } from 'react';
import Difficulty from './Difficulty';
import Manipulator from './Manipulator';
import SongCollection from './SongCollection';

import MidiPlayer from '../midiPlayer/MidiPlayer';

import '../css/Settings.css';
import { getPianoSynth } from '../piano/PianoSound';
import { getPlaybackSynth } from '../midiPlayer/MidiPlayerSound';

/**
 * In here: The game will be started, volume can be changed and seconds will be calculated.
 * @param holder
 * @returns
 */
const Settings = function settings(holder: {
  songNameArray: string[], onGameStartChange: any,
  onSongChoiceChange: any, onRestTimeChange: any,
  onPastTimeChange: any, songChoice: string,
  songLengthArray: number[], onTotalSongLengthChange: any,
  onPhaseChange: any, isGameStarted: boolean,
  phase: number
}) {
  /* Every time a second will be remove, secondsCounter will be added by 1 */
  let secondsCounter = -1; // like 1 -> 2 -> 3 -> 4 ... (Past seconds)

  /* Holds the rest seconds of a song */
  let songLengthInSeconds = 0; // like 10 -> 9 -> 8 -> 7 -> 6 ... (Rest seconds)

  /* Is an interval which we need to count down seconds */
  let interval: ReturnType<typeof setInterval>;

  /* Dis- or enables the restartListeningButton */
  const [listenReplayDisabled, setListenReplayDisabled] = useState(true);

  /* Will be displayed on the startGameButton */
  const [gameStatus, setGameStatus] = useState('Start');

  /* Internal phase counter which indicates in which phase the game currently is */
  const [phase, setPhase] = useState(0); // 0 = Game didn't start / 1 = listen phase / 2 = your turn phase

  /**
   * Calculates the seconds into a readable time (192 => 3:12).
   */
  function timeCalculator() {
    const divisorForMinutes = songLengthInSeconds % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);
    const seconds = Math.ceil(divisorForMinutes % 60);

    /* Crates times like 0:03 instead of 0:3. */
    if (seconds < 10) {
      secondsCounter += 1;
      songLengthInSeconds -= 1;
      holder.onPastTimeChange(secondsCounter);
      holder.onRestTimeChange(`${minutes}:0${seconds}`);
    } else {
      secondsCounter += 1;
      songLengthInSeconds -= 1;
      holder.onPastTimeChange(secondsCounter);
      holder.onRestTimeChange(`${minutes}:${seconds}`);
    }
  }

  /**
   * Starts an interval which calls timeCalculator() every second.
   */
  function startInterval() {
    interval = setInterval(() => {
      if (songLengthInSeconds >= 0) {
        timeCalculator();
      } else {
        /* In the end of each turn the button name and the phase number must be changed. */
        if (phase === 0) {
          setListenReplayDisabled(false);
          setGameStatus('Your turn');
          setPhase(1);
        } else if (phase === 1) {
          secondsCounter = 0;
          setPhase(0);
          setGameStatus('Start');
        }

        /* Both needs to be set to 0/false to change the states (States.tsx). */
        holder.onPhaseChange(0);
        holder.onGameStartChange(false);
        clearInterval(interval);
      }
    }, 1000);
  }

  function startGame() {
    const mp = new MidiPlayer();
    mp.convertAndPlay();

    if (holder.isGameStarted === false) {
      console.log('Game started');
      holder.onGameStartChange(true);

      /* Changes the overlay to the current phases. */
      if (phase === 0) {
        setGameStatus('Listen');
        holder.onPhaseChange(1);
      } else if (phase === 1) {
        holder.onPhaseChange(2);
        setListenReplayDisabled(true);
      }

      /* Finds out which game the user want to play, saves the length of his song and send it to the parent. */
      for (let index = 0; index <= holder.songNameArray.length; index += 1) {
        if (holder.songNameArray[index] === holder.songChoice) {
          songLengthInSeconds = holder.songLengthArray[index];
          holder.onTotalSongLengthChange(holder.songLengthArray[index]);
        }
      }

      startInterval();
    }
  }

  /**
   * Makes it possible to restart the listening phase.
   */
  function restartListening() {
    setGameStatus('Press me to restart listening');
    setPhase(0);
    holder.onPhaseChange(0);
  }

  /**
   * By pressing Enter the game will start.
   * @param event
   */
  const handleGameStarted = (event: any) => {
    if (event.key === 'Enter') {
      startGame();
    }
  };

  /* Enables the functionality to press enter to start the next phase. */
  if (holder.isGameStarted === false) {
    window.addEventListener('keydown', handleGameStarted);
  }

  return (
    <div id="settings" className="settings">
      <p className="settingsName">Settings</p>
      <Manipulator title="Own volume" id="ownVolume" audioOutput={getPianoSynth()} />
      <Manipulator title="Playback volume" id="playbackVolume" audioOutput={getPlaybackSynth()} />

      <p className="settingsName">Start a game</p>
      <SongCollection
        gameStarted={holder.isGameStarted}
        songNameArray={holder.songNameArray}
        onSongChoiceChange={holder.onSongChoiceChange}
        songChoice={holder.songChoice}
      />
      <Difficulty gameStarted={holder.isGameStarted} />
      <button type="button" onClick={startGame} id="startGameButton" disabled={holder.isGameStarted}>{gameStatus}</button>
      <button type="button" onClick={restartListening} id="restartListeningButton" disabled={listenReplayDisabled}>Restart listening</button>
    </div>
  );
};

export { Settings };
