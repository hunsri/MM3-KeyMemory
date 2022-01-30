/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import {
  clearCanvas,
  drawKey,
  spawnStripe,
  getRandomInt,
} from './NoteFunctions';
import Note from './Note';

import '../css/PianoRoll.css';

const col = { wrong: 'red', missed: 'blue', right: 'green' };
const displayRandomRequiredNotes = false;

/* song playing on the canvas */
const song: any = [];

/* height and width of canvas */
let height: number;
let width: number;

let noteNameInferedFromHolder: string;

let id: string | undefined;
let className: string | undefined;
let keyboard: string;
let specificNote: any;
let position: any;
let phase: number;
let inputDevice: { addListener: (arg0: string, arg1: (e: { note: { identifier: any; }; }) => void) => void; };

const noteRef: any = useRef();
const songRef: any = useRef();

/* context of the canvas */
let ctxNote: any; // where the user's notes are displayed
let ctxSong: any; // where the animation happens

/* width of the pressed key */
let keywidth: number;

/* for spawning notes -> spawnMidi */
let lastSpawn = -1;
const spawnRate = 5000; // spawn every 5ms

/** if key is pressed true */
let keypress = false;

/** color of the note/bar */
let color: string;

/** speed of the bars moving up */
const speed = 0.3;

// const NoteCanvas = function noteCanvas(holder: {
export default class NoteCanvas extends React.Component {
//   id: any, className: any, specificNote: string,
//   keyboard: string, position: string,
//   phase: number, inputDevice: any,
// }) {

  /* y - position */
  y = 0;

  /* duration of the note */
  duration = 0;

  constructor(props:any) {
    super(props);
    id = props.id;
    className = props.className;
    keyboard = props.keyboard;
    specificNote = props.specificNote;
    position = props.position;
    phase = props.phase;
    inputDevice = props.inputDevice;

    const canvaNote: any = noteRef.current;
    const canvaSong: any = songRef.current;
    if (canvaNote && canvaSong) {
      ctxNote = canvaNote.getContext('2d');
      ctxSong = canvaSong.getContext('2d');

      height = canvaSong.height;
      width = canvaSong.width;
      keywidth = width;

      if (ctxNote || ctxSong) {
        this.reader();
      }

      // Checks if MIDI device is connected
      if (inputDevice !== null && inputDevice !== undefined) {
        this.midiEvent();
        this.keyEvents();
      } else {
        this.keyEvents();
      }
    }

    //   noteNameInferedFromHolder = holder.specificNote;
    //   console.log(noteNameInferedFromHolder);
  }

  /**
   * Setter of keypress
   * @param bool true if key is pressed
   */
  // eslint-disable-next-line class-methods-use-this
  setKeyPressed(bool: boolean) {
    keypress = bool;
  }

  /**
   * Checks if the canva is empty in (x,y, w, height)
   * @param x the x-coordinate
   * @param y the y-coordinate
   * @param w the width
   * @returns true, if the canva is empty; false if not
   * https://stackoverflow.com/questions/29090384/check-if-all-pixels-in-a-region-are-all-empty-in-javascript
   */
  // eslint-disable-next-line react/sort-comp, class-methods-use-this
  checkPixel(x: number, y: number) {
    const img = ctxSong.getImageData(x, y, keywidth, 2);
    const u32 = new Uint32Array(img.data.buffer);
    let i = 0;
    const len = u32.length;
    while (i < len) {
      i += 1;
      if (u32[i] > 24) {
        return false;
      }
    } return true;
  }

  /**
   * @param empty - if the canvas was empty
   * @returns color of the note
   */
  // eslint-disable-next-line class-methods-use-this
  drawColor(empty: boolean) {
    let notecolor;
    if (empty === false) {
      notecolor = col.right; // when right key
    } else {
      notecolor = col.wrong; // wrong key
    }
    return notecolor;
  }

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line react/no-unused-class-component-methods
  createNoteIntern = function (duration: number) {
    song.push(spawnStripe(height, duration));
  };

  /**
   * Animation of the song
   */
  reader() {
    // const time = Date.now(); // for testing

    if (displayRandomRequiredNotes) {
      const time = Date.now() + getRandomInt(10000);
      // spawning of the random notes
      if (phase === 0) {
        if (time > lastSpawn + spawnRate) {
          lastSpawn = time + getRandomInt(10000);
          // lastSpawn = time + spawnRate; // for testing
          song.push(spawnStripe(height, 100));
        }
      }
    }

    requestAnimationFrame(this.reader);

    clearCanvas(ctxSong, width, height);

    for (let i = 0; i < song.length; i += 1) {
      const bar = song[i];
      bar.y -= speed;
      ctxSong.fillStyle = bar.color;
      drawKey(ctxSong, bar.y, keywidth, bar.duration);
    }
  }

  /**
   * Increases y and duration by 0.5
   */
  increase() {
    this.y += speed;
    this.duration += speed;
  }

  /**
   * Animates the drawing of a note while a key is pressed.
   */
  keyPressed() {
    let reqId = 0;
    if (keypress === true) {
      const oldcolor = color;
      color = this.drawColor(this.checkPixel(0, height - 1));

      if (color !== oldcolor && oldcolor !== undefined) {
        this.y += 1; // must be 1 !
        clearCanvas(ctxNote, width, height);
        const bar = new Note('key', height - this.y, this.duration, oldcolor);
        song.push(bar);
        this.y = 0;
        this.duration = 0;
      }
      this.increase();

      ctxNote.fillStyle = color;
      drawKey(ctxNote, height - this.y, keywidth, this.duration);

      reqId = requestAnimationFrame(this.keyPressed);
    } else {
      cancelAnimationFrame(reqId);
    }
  }

  /**
   * When a key is pressed a drawing animation of a note is started
   * @param event - the keyevent
   */
  keyDown(event: KeyboardEvent) { // handleInput
    if (!event.repeat) {
      if (event.key === keyboard) {
        this.setKeyPressed(true);
        this.keyPressed();
      }
    }
  }

  /**
   * When the key is released, a new note is added to the song and animated
   * @param event pressed key
   */
  keyUp(event: KeyboardEvent) { // handleinputEnd
    if (event.key === keyboard) {
      this.setKeyPressed(false);
      clearCanvas(ctxNote, width, height);
      const bar = new Note(event.key, height - this.y, this.duration, color);
      song.push(bar);
      this.y = 0;
      this.duration = 0;
    }
  }

  /**
   * Adds listeners to draw notes
   */
  keyEvents() {
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  /**
   * Adds MIDI listeners to draw notes
   */
  midiEvent() {
    inputDevice.addListener('noteon', (e: { note: { identifier: any; }; }) => {
      if (e.note.identifier === specificNote) {
        this.setKeyPressed(true);
        this.keyPressed();
      }
    });

    inputDevice.addListener('noteoff', (e: { note: { identifier: any; }; }) => {
      if (e.note.identifier === specificNote) {
        this.setKeyPressed(false);
        clearCanvas(ctxNote, width, height);
        const bar = new Note(e.note.identifier, height - this.y, this.duration, color);
        song.push(bar);
        this.y = 0;
        this.duration = 0;
      }
    });
  }

  render() {
    return (
      <div id={id} className={className}>
        <canvas
          id="note"
          ref={noteRef}
          className="note"
          style={{ right: position }}
        />
        <canvas
          id="song"
          ref={songRef}
          className="song"
          style={{ right: position }}
        />
      </div>
    );
  }
}

export const createNote = function (noteName: any, duration: any) {
  console.log(noteName, duration);
  if (noteName === noteNameInferedFromHolder) {
    song.push(spawnStripe(height, 1000));
  }
};

// export default NoteCanvas;
