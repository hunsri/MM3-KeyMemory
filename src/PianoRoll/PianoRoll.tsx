import React from 'react';
import NoteCanva from './NoteCanva';
import './PianoRoll.css';

const PianoRoll = function pianoRoll() {
  return (
    <div id="pianoRoll" className="pianoRoll">
      <div id="pianoRollwhite">
        <NoteCanva id="w1" className="white" />
        <NoteCanva id="w2" className="white" />
        <NoteCanva id="w3" className="white" />
        <NoteCanva id="w4" className="white" />
        <NoteCanva id="w5" className="white" />
        <NoteCanva id="w6" className="white" />
        <NoteCanva id="w7" className="white" />

        <NoteCanva id="w8" className="white" />
        <NoteCanva id="w9" className="white" />
        <NoteCanva id="w10" className="white" />
        <NoteCanva id="w11" className="white" />
        <NoteCanva id="w12" className="white" />
        <NoteCanva id="w13" className="white" />
        <NoteCanva id="w14" className="white" />
      </div>
      <div id="pianoRollblack">
        <NoteCanva id="b1" className="black" />
        <NoteCanva id="b2" className="black" />
        <NoteCanva id="b3" className="black" />
        <NoteCanva id="b4" className="black" />
        <NoteCanva id="b5" className="black" />

        <NoteCanva id="b6" className="black" />
        <NoteCanva id="b7" className="black" />
        <NoteCanva id="b8" className="black" />
        <NoteCanva id="b9" className="black" />
        <NoteCanva id="b10" className="black" />
      </div>
    </div>
  );
};

export { PianoRoll };
