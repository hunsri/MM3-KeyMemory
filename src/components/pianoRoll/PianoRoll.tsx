import React from 'react';
import NoteCanva from './NoteCanva';

import '../css/PianoRoll.css';

const PianoRoll = function pianoRoll() {
  return (
    <div id="pianoRoll" className="pianoRoll">
      <div id="pianoRollwhite">
        <NoteCanva id="w1" className="white" keyboard="q" position="" />
        <NoteCanva id="w2" className="white" keyboard="w" position="" />
        <NoteCanva id="w3" className="white" keyboard="e" position="" />
        <NoteCanva id="w4" className="white" keyboard="r" position="" />
        <NoteCanva id="w5" className="white" keyboard="t" position="" />
        <NoteCanva id="w6" className="white" keyboard="z" position="" />
        <NoteCanva id="w7" className="white" keyboard="u" position="" />

        <NoteCanva id="w8" className="white" keyboard="a" position="" />
        <NoteCanva id="w9" className="white" keyboard="s" position="" />
        <NoteCanva id="w10" className="white" keyboard="d" position="" />
        <NoteCanva id="w11" className="white" keyboard="f" position="" />
        <NoteCanva id="w12" className="white" keyboard="g" position="" />
        <NoteCanva id="w13" className="white" keyboard="h" position="" />
        <NoteCanva id="w14" className="white" keyboard="j" position="" />
      </div>
      <div id="pianoRollblack">
        <NoteCanva id="b1" className="black" keyboard="1" position="" />
        <NoteCanva id="b2" className="black" keyboard="2" position="" />
        <NoteCanva id="b3" className="black" keyboard="3" position="" />
        <NoteCanva id="b4" className="black" keyboard="4" position="" />
        <NoteCanva id="b5" className="black" keyboard="5" position="" />

        <NoteCanva id="b6" className="black" keyboard="6" position="" />
        <NoteCanva id="b7" className="black" keyboard="7" position="" />
        <NoteCanva id="b8" className="black" keyboard="8" position="" />
        <NoteCanva id="b9" className="black" keyboard="9" position="" />
        <NoteCanva id="b10" className="black" keyboard="0" position="" />
      </div>
    </div>
  );
};

export { PianoRoll };
