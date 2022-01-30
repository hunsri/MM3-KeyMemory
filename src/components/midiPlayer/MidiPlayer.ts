/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import { Midi } from '@tonejs/midi';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Tone = require('tone');

// const midiDataTest = fs.readFileSync('/../../../public/songs/examples_bach_846.mid');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const midiDataTest = require('../../songs/examples_bach_846.mid');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NoteCanvas = require('../pianoRoll/NoteCanvas');

class MidiPlayer {
    readonly chosenSongIndex = 0;

    readonly songNames = ['examples_bach_846.mid', 'BurnedTower.mid'];

    readonly path = 'http://127.0.0.1:8080/public/';

    lastChosenSongPath = '';

    readonly currentlyChosenSongPath = (`${this.path}${this.songNames[this.chosenSongIndex]}`);

    // filled by a function, don't interact with this variable, stuff will break
    tonejsMidiObject: any | null = null;

    playing = false;

    // synth playback
    synths: any[] = [];

    // eslint-disable-next-line no-unused-vars
    async convertMidiToTonejs() {
      let midiReturnValue;

      console.log(`plays ${this.currentlyChosenSongPath}`);
      // console.log(FileUtils.getFilesInDirectory(`${this.currentlyChosenSongPath}));

      const midiPromise = new Promise((resolve) => {
        if (this.currentlyChosenSongPath !== null) {
          if (this.currentlyChosenSongPath !== this.lastChosenSongPath) {
            // const midiData = fs.readFileSync('/../../../public/songs/examples_bach_846.mid');
            // const midi = new Midi(midiDataTest);
            Midi.fromUrl(this.currentlyChosenSongPath).then((midi) => {
              console.log('song wasnt converted yet, converted it');
              console.log(midi);
              this.lastChosenSongPath = this.currentlyChosenSongPath;
              this.tonejsMidiObject = midi;
              midiReturnValue = this.tonejsMidiObject;
              resolve(midiReturnValue);
            });
          } else {
            console.log('song unchanged, no need for reloading it');
            midiReturnValue = this.tonejsMidiObject;
            resolve(midiReturnValue);
          }
        }
      });
      // eslint-disable-next-line no-return-await
      return await midiPromise;
    }

    stopPlaying() {
      if (this.playing) {
        this.playing = false;
        // dispose the synth and make a new one
        while (this.synths.length) {
          const synth = this.synths.shift();
          synth.dispose();
        }
        Tone.Transport.stop();
      }
    }

    playTheSong(midi: any) {
      const now = Tone.now() + 0.5;
      console.log(midi.tracks);
      midi.tracks.forEach((track: { notes: any[]; }) => {
        console.log('track');
        // create a synth for each track
        // only using 1 synth instrument here, default is 4
        const synth = new Tone.PolySynth(1, Tone.Synth, {
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1,
          },
        }).toMaster();
        this.synths.push(synth);
        // schedule all of the events
        track.notes.forEach((note) => {
          // console.log('note');
          // console.log(`${note.name}, ${note.duration}, ${note.time + now}, ${note.velocity}`);

          synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
          // synth.triggerAttackRelease('C4', '2n');
          // eslint-disable-next-line no-unused-vars
          const timedCallbackNoteDown = (time: any) => {
            // console.log(`${time.toFixed(4)}: Down ${note.name}`);
          };
          // eslint-disable-next-line no-unused-vars
          const timedCallbackNoteUp = (time: any) => {
            // console.log(`${time.toFixed(4)}: Up   ${note.name}`);
          };

          // new Tone.Event(myCallbacker(note.name, timedCallback));
          Tone.Transport.scheduleOnce((time: any) => {
            timedCallbackNoteDown(time);
            NoteCanvas.createNote(note.name, note.duration);
          }, note.time);

          Tone.Transport.scheduleOnce((time: any) => {
            timedCallbackNoteUp(time);
          }, note.time + note.duration);
        });
      });
      console.log(this.synths);
      Tone.Transport.start();
    }

    async convertAndPlay() {
      if (!this.playing) {
        this.playing = true;
        // const midi = await convertMidiToTonejs();
        this.convertMidiToTonejs().then((midi) => this.playTheSong(midi));

        // playTheSong(midi);
      }
    }
}

export default MidiPlayer;
