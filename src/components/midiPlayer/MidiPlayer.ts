import { Midi } from '@tonejs/midi';
import { playSoundOnPlayback } from './MidiPlayerSound';
import { setNoteDuration } from './NoteStates';
import { getLowestOctave, getSongIndex } from './SongSwitcher';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Tone = require('tone');

class MidiPlayer {
    readonly chosenSongIndex = 0;

    readonly songNames = ['BeethovenOde_To_Joy_Easy.mid', 'examples_bach_846.mid'];

    readonly path = '/backend/public/';

    lastChosenSongPath = '';

    // filled by a function, don't interact with this variable, stuff will break
    tonejsMidiObject: any | null = null;

    playing = false;

    // synth playback
    synths: any[] = [];

    // eslint-disable-next-line no-unused-vars
    async convertMidiToTonejs() {
      let midiReturnValue;

      // let lowestOctave = getLowestOctave;
      const currentlyChosenSongPath = (`${this.path}${this.songNames[getSongIndex()]}`);
      console.log(`plays ${currentlyChosenSongPath}`);

      const midiPromise = new Promise((resolve) => {
        if (currentlyChosenSongPath !== null) {
          if (currentlyChosenSongPath !== this.lastChosenSongPath) {
            Midi.fromUrl(currentlyChosenSongPath).then((midi) => {
              // console.log('song wasnt converted yet, converted it');
              // console.log(midi);
              this.lastChosenSongPath = currentlyChosenSongPath;
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
      const lowestOctave = getLowestOctave();

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
        // schedule all of the events
        track.notes.forEach((note) => {
          // registers the events for the sound
          // synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
          playSoundOnPlayback(note, now);
          // eslint-disable-next-line no-unused-vars
          const timedCallbackNoteDown = (time: any) => {
            // console.log(Tone.Master.volume.value);
            this.setRespectiveGlobalNoteState(note.name, note.duration);
          };
          // eslint-disable-next-line no-unused-vars
          const timedCallbackNoteUp = (time: any) => {
            this.setRespectiveGlobalNoteState(note.name, 0);
          };

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
