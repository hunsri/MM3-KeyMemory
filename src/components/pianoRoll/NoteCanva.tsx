import React, { useEffect, useRef } from 'react';
import { clearCanvas, drawKey, spawnMidi } from './Help';
import Note from './Note';

import '../css/PianoRoll.css';

const col = { red: 'red', blue: 'blue', green: 'green' };

const NoteCanva = function notecanva(id: any, classname: any) {
  const noteRef: any = useRef();
  const songRef:any = useRef();

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

  /**
   * Setter of keypress
   * @param bool true if key is pressed */
  function setKeyPressed(bool: boolean) {
    keypress = bool;
  }

  /**
   * Checks if the canva is empty in (x,y, w, height)
   * @param x the x-coordinate
   * @param y the y-coordinate
   * @param w the width
   * @returns true, if the canva is empty; false if not
   */
  function checkPixel(x: number, y: number) {
    const img = ctxSong.getImageData(x, y, keywidth, 2);
    const u32 = new Uint32Array(img.data.buffer);
    let i = 0;
    const len = u32.length;
    while (i < len) {
      i += 1;
      if (u32[i] !== 0) {
        return false;
      }
    } return true;
  }

  /**
   * @param empty - if the canvas was empty
   * @returns color of the note
   */
  function drawColor(empty: boolean) {
    if (!empty) {
      color = col.green; // when match
    } else {
      color = col.red; // missed
    }
  }

  /**
   * Animation of the song
   */
  function reader() {
    const time = Date.now();

    // spawning of the random notes
    if (time > lastSpawn + spawnRate) {
      lastSpawn = time;
      song.push(spawnMidi(height));
    }
    // requestAnimationFrame(reader);

    clearCanvas(ctxSong, width, height);

    for (let i = 0; i < song.length; i += 1) {
      const bar = song[i];
      bar.y -= 0.5;
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
    y += 0.5;
    duration += 0.5;
  }

  /**
   * Animates the drawing of a note while a key is pressed.
   */
  function keyPressed() {
    let reqId = 0;
    if (keypress === true) {
      drawColor(checkPixel(0, y));
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
      if (event.key === '1') {
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
    setKeyPressed(false);
    clearCanvas(ctxNote, width, height);
    const bar = new Note(event.key, height - y, duration, color);
    song.push(bar);
    y = 0;
    duration = 0;
  }

  /**
   * Adds listeners to draw notes
   */
  function keyEvents() {
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
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
        keyEvents();
      }
    }
  });

  return (
    <div id={id} className={classname}>
      <canvas
        id="note"
        ref={noteRef}
        className="note"
      />
      <canvas
        id="song"
        ref={songRef}
        className="song"
      />
    </div>
  );
};

export default NoteCanva;
