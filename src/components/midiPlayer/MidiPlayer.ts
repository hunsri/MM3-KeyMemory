import { Midi } from '@tonejs/midi';
import { setNoteDuration } from './NoteStates';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Tone = require('tone');

// the lowest octave that should be displayed
const lowestOctave = 4;

class MidiPlayer {
    readonly chosenSongIndex = 0;

    readonly songNames = ['examples_bach_846.mid'];

    readonly path = 'http://127.0.0.1:8080/backend/public/';

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

      const midiPromise = new Promise((resolve) => {
        if (this.currentlyChosenSongPath !== null) {
          if (this.currentlyChosenSongPath !== this.lastChosenSongPath) {
            Midi.fromUrl(this.currentlyChosenSongPath).then((midi) => {
              // console.log('song wasnt converted yet, converted it');
              // console.log(midi);
              this.lastChosenSongPath = this.currentlyChosenSongPath;
              this.tonejsMidiObject = midi;
              midiReturnValue = this.tonejsMidiObject;
              resolve(midiReturnValue);
            });
          } else {
            // console.log('song unchanged, no need for reloading it');
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

    // eslint-disable-next-line class-methods-use-this
    setRespectiveGlobalNoteState(noteName: string, duration: number) {
      if (noteName === `C${lowestOctave}`) { setNoteDuration(0, duration); }
      if (noteName === `C#${lowestOctave}`) { setNoteDuration(1, duration); }
      if (noteName === `D${lowestOctave}`) { setNoteDuration(2, duration); }
      if (noteName === `D#${lowestOctave}`) { setNoteDuration(3, duration); }
      if (noteName === `E${lowestOctave}`) { setNoteDuration(4, duration); }
      if (noteName === `F${lowestOctave}`) { setNoteDuration(5, duration); }
      if (noteName === `F#${lowestOctave}`) { setNoteDuration(6, duration); }
      if (noteName === `G${lowestOctave}`) { setNoteDuration(7, duration); }
      if (noteName === `G#${lowestOctave}`) { setNoteDuration(8, duration); }
      if (noteName === `A${lowestOctave}`) { setNoteDuration(9, duration); }
      if (noteName === `A#${lowestOctave}`) { setNoteDuration(10, duration); }
      if (noteName === `B${lowestOctave}`) { setNoteDuration(11, duration); }
      if (noteName === `C${lowestOctave + 1}`) { setNoteDuration(12, duration); }
      if (noteName === `C#${lowestOctave + 1}`) { setNoteDuration(13, duration); }
      if (noteName === `D${lowestOctave + 1}`) { setNoteDuration(14, duration); }
      if (noteName === `D#${lowestOctave + 1}`) { setNoteDuration(15, duration); }
      if (noteName === `E${lowestOctave + 1}`) { setNoteDuration(16, duration); }
      if (noteName === `F${lowestOctave + 1}`) { setNoteDuration(17, duration); }
      if (noteName === `F#${lowestOctave + 1}`) { setNoteDuration(18, duration); }
      if (noteName === `G${lowestOctave + 1}`) { setNoteDuration(19, duration); }
      if (noteName === `G#${lowestOctave + 1}`) { setNoteDuration(20, duration); }
      if (noteName === `A${lowestOctave + 1}`) { setNoteDuration(21, duration); }
      if (noteName === `A#${lowestOctave + 1}`) { setNoteDuration(22, duration); }
      if (noteName === `B${lowestOctave + 1}`) { setNoteDuration(23, duration); }
    }

    playTheSong(midi: any) {
      const now = Tone.now() + 0.5;
      midi.tracks.forEach((track: { notes: any[]; }) => {
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
          // registers the events for the sound
          synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
          // eslint-disable-next-line no-unused-vars
          const timedCallbackNoteDown = (time: any) => {
            this.setRespectiveGlobalNoteState(note.name, note.duration);
          };
          // eslint-disable-next-line no-unused-vars
          const timedCallbackNoteUp = (time: any) => {
            this.setRespectiveGlobalNoteState(note.name, 0);
          };

          // new Tone.Event(myCallbacker(note.name, timedCallback));
          Tone.Transport.scheduleOnce((time: any) => {
            timedCallbackNoteDown(time);
          }, note.time);

          Tone.Transport.scheduleOnce((time: any) => {
            timedCallbackNoteUp(time);
          }, note.time + note.duration);
        });
      });
      // starts the playing of the notes, not the sound itself
      Tone.Transport.start();
    }

    async convertAndPlay() {
      if (!this.playing) {
        this.playing = true;
        this.convertMidiToTonejs().then((midi) => this.playTheSong(midi));
      }
    }
}

export default MidiPlayer;
