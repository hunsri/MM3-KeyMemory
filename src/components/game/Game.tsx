import React from 'react';
import '../css/Game.css';
import Canvas from './Canvas';
import Timeline from './Timeline';

/**
 * Displays the song and his information.
 * For example showing his length and name.
 * @param holder
 * @returns
 */
const Game = function game(holder: {
  songNameArray: string[], songLenghtArray: number[],
  songChoice: string, pastTime: number,
  restTime: string, totalSongLength: number
}) {
  return (
    <div id="core" className="core">
      <p id="songName">{holder.songChoice}</p>
      <div id="timeline">
        <p id="timelineLength">{holder.restTime}</p>
        <Timeline songName={holder.songChoice} totalSongLength={holder.totalSongLength} pastLenght={holder.pastTime} />
      </div>
      <div id="gameBox" className="gameBox">
        <Canvas className="whiteLine" position="93%" />
        <Canvas className="whiteLine" position="78.5%" />
        <Canvas className="whiteLine" position="64%" />
        <Canvas className="whiteLine" position="50%" />
        <Canvas className="whiteLine" position="35.5%" />
        <Canvas className="whiteLine" position="21.5%" />
        <Canvas className="whiteLine" position="7%" />

        <Canvas className="blackLine" position="846px" />
        <Canvas className="blackLine" position="706px" />
        <Canvas className="blackLine" position="422px" />
        <Canvas className="blackLine" position="282px" />
        <Canvas className="blackLine" position="142px" />

        <Canvas className="blackLine" position="-142px" />
        <Canvas className="blackLine" position="-282px" />
        <Canvas className="blackLine" position="-566px" />
        <Canvas className="blackLine" position="-706px" />
        <Canvas className="blackLine" position="-846px" />

        <Canvas className="whiteLine" position="-7%" />
        <Canvas className="whiteLine" position="-21.5%" />
        <Canvas className="whiteLine" position="-35.5%" />
        <Canvas className="whiteLine" position="-50%" />
        <Canvas className="whiteLine" position="-64%" />
        <Canvas className="whiteLine" position="-78.5%" />
        <Canvas className="whiteLine" position="-93%" />
      </div>
    </div>
  );
};

export { Game };
