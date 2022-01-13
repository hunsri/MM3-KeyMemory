import React from 'react';
import '../css/Overview.css';

const Score = function score() {
  return (
    <div id="scoreComponent">
      Matching playback
      <div id="currentScore" className="score">0%</div>
    </div>
  );
};

export default Score;
