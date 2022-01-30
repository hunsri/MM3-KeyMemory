// eslint-disable-next-line @typescript-eslint/no-var-requires
const Tone = require('tone');

const synthForPlayback = new Tone.Synth();
synthForPlayback.toMaster();

function playSoundOnPlayback(note: { name: any; duration: any; time: any; velocity: any; }, now: number) {
  synthForPlayback.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
}

function getPlaybackSynth() {
  return synthForPlayback;
}

function setPlaybackVolume(volume : number) {
  synthForPlayback.volume = volume;
}

export {
  playSoundOnPlayback, setPlaybackVolume, getPlaybackSynth,
};
