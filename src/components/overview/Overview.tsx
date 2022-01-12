import React from 'react';
import '../css/Overview.css';
import Score from './Score';
import State from './State';
import Legend from './Legend';

/**
 * Shows information about the game.
 * @param holder
 * @returns
 */
const Overview = function overview(holder: { gameStarted: boolean, phase: number }) {
  return (
    <div id="overview" className="overview">
      <p className="overviewName">Overview</p>
      <Score />
      <State gameStarted={holder.gameStarted} phase={holder.phase} />
      <Legend />
    </div>
  );
};

export { Overview };
