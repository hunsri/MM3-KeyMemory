import React from 'react';
import Score from './Score';
import State from './State';
import Legend from './Legend';
import MidiDevice from './MidiDevice';

import '../css/Overview.css';

/**
 * Shows information about the game.
 * @param holder
 * @returns
 */
const Overview = function overview(holder: {
  gameStarted: boolean, phase: number,
  midiDevice: any
}) {
  return (
    <div id="overview" className="overview">
      <p className="overviewName">Overview</p>
      <Score />
      <State gameStarted={holder.gameStarted} phase={holder.phase} />
      <Legend />
      <MidiDevice isDeviceAccessible={holder.midiDevice} />
    </div>
  );
};

export { Overview };
