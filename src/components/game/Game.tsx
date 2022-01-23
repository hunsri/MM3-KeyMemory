import React from 'react';
import Canvas from './Canvas';
import Timeline from './Timeline';
import NoteCanva from '../pianoRoll/NoteCanva';

import '../css/Game.css';
import '../css/PianoRoll.css';

/**
 * Displays the song and his information.
 * For example showing his length and name.
 * @param holder
 * @returns
 */
const Game = function game(holder: {
  songNameArray: string[], songLenghtArray: number[],
  songChoice: string, pastTime: number,
  restTime: string, totalSongLength: number,
  phase: number, inputDevice: any
}) {
  return (
    <div id="core" className="core">
      <p id="songName">{holder.songChoice}</p>
      <div id="timeline">
        <p id="timelineLength">{holder.restTime}</p>
        <Timeline songName={holder.songChoice} totalSongLength={holder.totalSongLength} pastLenght={holder.pastTime} />
      </div>
      <div id="gameBox" className="gameBox">
        <div>
          <Canvas className="whiteLine" position="93%" />
          <NoteCanva id="w1" className="white" keyboard="q" position="93%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="78.5%" />
          <NoteCanva id="w2" className="white" keyboard="w" position="78.5%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="64%" />
          <NoteCanva id="w3" className="white" keyboard="e" position="64%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="50%" />
          <NoteCanva id="w4" className="white" keyboard="r" position="50%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="35.5%" />
          <NoteCanva id="w5" className="white" keyboard="t" position="35.5%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="21.5%" />
          <NoteCanva id="w6" className="white" keyboard="z" position="21.5%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="7%" />
          <NoteCanva id="w7" className="white" keyboard="u" position="7%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>

        <div>
          <Canvas className="blackLine" position="846px" />
          <NoteCanva id="b1" className="black" keyboard="1" position="846px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="706px" />
          <NoteCanva id="b2" className="black" keyboard="2" position="706px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="422px" />
          <NoteCanva id="b3" className="black" keyboard="3" position="422px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="282px" />
          <NoteCanva id="b4" className="black" keyboard="4" position="282px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="142px" />
          <NoteCanva id="b5" className="black" keyboard="5" position="142px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>

        <div>
          <Canvas className="blackLine" position="-142px" />
          <NoteCanva id="b6" className="black" keyboard="6" position="-142px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="-282px" />
          <NoteCanva id="b7" className="black" keyboard="7" position="-282px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="-566px" />
          <NoteCanva id="b8" className="black" keyboard="8" position="-566px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="-706px" />
          <NoteCanva id="b9" className="black" keyboard="9" position="-706" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="blackLine" position="-846px" />
          <NoteCanva id="b10" className="black" keyboard="0" position="-846px" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>

        <div>
          <Canvas className="whiteLine" position="-7%" />
          <NoteCanva id="w8" className="white" keyboard="a" position="-7%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="-21.5%" />
          <NoteCanva id="w9" className="white" keyboard="s" position="-21.5%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="-35.5%" />
          <NoteCanva id="w10" className="white" keyboard="d" position="-35.5%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="-50%" />
          <NoteCanva id="w11" className="white" keyboard="f" position="-50%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="-64%" />
          <NoteCanva id="w12" className="white" keyboard="g" position="-64%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="-78.5%" />
          <NoteCanva id="w13" className="white" keyboard="h" position="-78.5%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
        <div>
          <Canvas className="whiteLine" position="-93%" />
          <NoteCanva id="w14" className="white" keyboard="j" position="-93%" phase={holder.phase} inputDevice={holder.inputDevice} />
        </div>
      </div>
    </div>
  );
};

export { Game };
