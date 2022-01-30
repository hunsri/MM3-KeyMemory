// eslint-disable-next-line @typescript-eslint/no-var-requires
const Tone = require('tone');

const synthForUserPlaying = new Tone.Synth();
synthForUserPlaying.toMaster();

function playSoundOnPiano(noteName : string) {
  synthForUserPlaying.triggerAttackRelease(noteName, '8n');
}

function getPianoSynth() {
  return synthForUserPlaying;
}

function setPianoVolume(volume : number) {
  synthForUserPlaying.volume = volume;
}

export {
  playSoundOnPiano, setPianoVolume, getPianoSynth,
};
