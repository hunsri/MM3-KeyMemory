import React, { useEffect, useRef } from 'react';
import {
  clearCanvas,
  drawKey,
  spawnMidi,
  getRandomInt,
} from './Help';
import Note from './Note';

import '../css/PianoRoll.css';

const col = { wrong: 'red', missed: 'blue', right: 'green' };

const NoteCanva = function noteCanva(holder: {
  id: any, className: any, specificNote: string,
  keyboard: string, position: string,
  phase: number, inputDevice: any
}) {
  const noteRef: any = useRef();
  const songRef: any = useRef();

  /* context of the canvas */
  let ctxNote: any; // where the user's notes are displayed
  let ctxSong: any; // where the animation happens

  /* height and width of canvas */
  let height: number;
  let width: number;

  /* width of the pressed key */
  let keywidth: number;

  /* song playing on the canvas */
  const song: any = [];

  /* for spawning notes -> spawnMidi */
  let lastSpawn = -1;
  const spawnRate = 5000; // spawn every 5ms

  /** if key is pressed true */
  let keypress = false;

  /** color of the note/bar */
  let color: string;

  /** speed of the bars moving up */
  const speed = 0.3;

  /**
   * Setter of keypress
   * @param bool true if key is pressed
   */
  function setKeyPressed(bool: boolean) {
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
  function checkPixel(x: number, y: number) {
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
  function drawColor(empty: boolean) {
    let notecolor;
    if (empty === false) {
      notecolor = col.right; // when right key
    } else {
      notecolor = col.wrong; // wrong key
    }
    return notecolor;
  }

  /**
   * Animation of the song
   */
  function reader() {
    const time = Date.now() + getRandomInt(10000);
    // const time = Date.now(); // for testing

    // spawning of the random notes
    if (holder.phase === 0) {
      if (time > lastSpawn + spawnRate) {
        lastSpawn = time + getRandomInt(10000);
        // lastSpawn = time + spawnRate; // for testing
        song.push(spawnMidi(height));
      }
    }
    requestAnimationFrame(reader);

    clearCanvas(ctxSong, width, height);

    for (let i = 0; i < song.length; i += 1) {
      const bar = song[i];
      bar.y -= speed;
      ctxSong.fillStyle = bar.color;
      drawKey(ctxSong, bar.y, keywidth, bar.duration);
    }
  }

  /* y - position */
  let y = 0;

  /* duration of the note */
  let duration = 0;

  /**
   * Increases y and duration by 0.5
   */
  function increase() {
    y += speed;
    duration += speed;
  }

  /**
   * Animates the drawing of a note while a key is pressed.
   */
  function keyPressed() {
    let reqId = 0;
    if (keypress === true) {
      const oldcolor = color;
      color = drawColor(checkPixel(0, height - 1));

      if (color !== oldcolor && oldcolor !== undefined) {
        y += 1; // must be 1 !
        clearCanvas(ctxNote, width, height);
        const bar = new Note('key', height - y, duration, oldcolor);
        song.push(bar);
        y = 0;
        duration = 0;
      }
      increase();

      ctxNote.fillStyle = color;
      drawKey(ctxNote, height - y, keywidth, duration);

      reqId = requestAnimationFrame(keyPressed);
    } else {
      cancelAnimationFrame(reqId);
    }
  }

  /**
   * When a key is pressed a drawing animation of a note is started
   * @param event - the keyevent
   */
  function keyDown(event: KeyboardEvent) { // handleInput
    if (!event.repeat) {
      if (event.key === holder.keyboard) {
        setKeyPressed(true);
        keyPressed();
      }
    }
  }

  /**
   * When the key is released, a new note is added to the song and animated
   * @param event pressed key
   */
  function keyUp(event: KeyboardEvent) { // handleinputEnd
    if (event.key === holder.keyboard) {
      setKeyPressed(false);
      clearCanvas(ctxNote, width, height);
      const bar = new Note(event.key, height - y, duration, color);
      song.push(bar);
      y = 0;
      duration = 0;
    }
  }

  /**
   * Adds listeners to draw notes
   */
  function keyEvents() {
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
  }

  function midiEvent() {
    holder.inputDevice.addListener('noteon', (e: { note: { identifier: any; }; }) => {
      if (e.note.identifier === holder.specificNote) {
        setKeyPressed(true);
        keyPressed();
      }
    });

    holder.inputDevice.addListener('noteoff', (e: { note: { identifier: any; }; }) => {
      if (e.note.identifier === holder.specificNote) {
        setKeyPressed(false);
        clearCanvas(ctxNote, width, height);
        const bar = new Note(e.note.identifier, height - y, duration, color);
        song.push(bar);
        y = 0;
        duration = 0;
      }
    });
  }

  useEffect(() => {
    const canvaNote: any = noteRef.current;
    const canvaSong: any = songRef.current;
    if (canvaNote && canvaSong) {
      ctxNote = canvaNote.getContext('2d');
      ctxSong = canvaSong.getContext('2d');

      height = canvaSong.height;
      width = canvaSong.width;
      keywidth = width;

      if (ctxNote || ctxSong) {
        reader();

        // Checks if MIDI device is connected
        if (holder.inputDevice !== null && holder.inputDevice !== undefined) {
          midiEvent();
          keyEvents();
        } else {
          keyEvents();
        }
      }
    }
  });

  return (
    <div id={holder.id} className={holder.className}>
      <canvas
        id="note"
        ref={noteRef}
        className="note"
        style={{ right: holder.position }}
      />
      <canvas
        id="song"
        ref={songRef}
        className="song"
        style={{ right: holder.position }}
      />
    </div>
  );
};

export default NoteCanva;
