import React from 'react';
import NoteCanva from './NoteCanva';

import '../css/PianoRoll.css';

const PianoRoll = function pianoRoll() {
  return (
    <div id="pianoRoll" className="pianoRoll">
      <div id="pianoRollwhite">
        <NoteCanva id="w1" className="white" keyboard="q" />
        <NoteCanva id="w2" className="white" keyboard="w" />
        <NoteCanva id="w3" className="white" keyboard="e" />
        <NoteCanva id="w4" className="white" keyboard="r" />
        <NoteCanva id="w5" className="white" keyboard="t" />
        <NoteCanva id="w6" className="white" keyboard="z" />
        <NoteCanva id="w7" className="white" keyboard="u" />

        <NoteCanva id="w8" className="white" keyboard="a" />
        <NoteCanva id="w9" className="white" keyboard="s" />
        <NoteCanva id="w10" className="white" keyboard="d" />
        <NoteCanva id="w11" className="white" keyboard="f" />
        <NoteCanva id="w12" className="white" keyboard="g" />
        <NoteCanva id="w13" className="white" keyboard="h" />
        <NoteCanva id="w14" className="white" keyboard="j" />
      </div>
      <div id="pianoRollblack">
        <NoteCanva id="b1" className="black" keyboard="1" />
        <NoteCanva id="b2" className="black" keyboard="2" />
        <NoteCanva id="b3" className="black" keyboard="3" />
        <NoteCanva id="b4" className="black" keyboard="4" />
        <NoteCanva id="b5" className="black" keyboard="5" />

        <NoteCanva id="b6" className="black" keyboard="6" />
        <NoteCanva id="b7" className="black" keyboard="7" />
        <NoteCanva id="b8" className="black" keyboard="8" />
        <NoteCanva id="b9" className="black" keyboard="9" />
        <NoteCanva id="b10" className="black" keyboard="0" />
      </div>
    </div>
  );
};

export { PianoRoll };
