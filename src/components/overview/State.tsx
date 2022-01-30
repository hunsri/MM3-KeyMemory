import React from 'react';
import '../css/Overview.css';
import playLogo from '../../images/playIcon1.png';
import pauseLogo from '../../images/pauseIcon.png';
import listenLogo from '../../images/listenIcon.png';

/**
 * Shows the current state of the game.
 * Listen (blue), Player plays (green), game didn't start (red).
 * @param holder
 * @returns
 */
const State = function state(holder: { gameStarted: boolean, phase: number }) {
  /* Booleans which changes the boxShadow color */
  let isStarted = false;
  let listenBeginned = false;
  let isNothing = true;

  /* Changes the color of each state. */
  if (holder.gameStarted === true && holder.phase === 1) {
    isStarted = false;
    listenBeginned = true;
    isNothing = false;
  } else if (holder.gameStarted === true && holder.phase === 2) {
    isStarted = true;
    listenBeginned = false;
    isNothing = false;
  } else {
    isStarted = false;
    listenBeginned = false;
    isNothing = true;
  }

  return (
    <div id="stateComponent">
      State
      <div id="states">
        <div id="listenState" className="state" style={{ boxShadow: listenBeginned ? 'inset 0 0 0.5em blue' : 'none' }}>
          <img src={listenLogo} className="logo" alt="playLogo" />
        </div>
        <div id="playState" className="state" style={{ boxShadow: isStarted ? 'inset 0 0 0.5em green' : 'none' }}>
          <img src={playLogo} className="logo" alt="playLogo" />
        </div>
        <div id="pauseState" className="state" style={{ boxShadow: isNothing ? 'inset 0 0 0.5em red' : 'none' }}>
          <img src={pauseLogo} className="logo" alt="playLogo" />
        </div>
      </div>
    </div>
  );
};

export default State;
