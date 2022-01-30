let songIndex = 0;
// the lowest octave that should be displayed
let lowestOctave = 3;

// hardcoded song entries
// should be dynamic in the future
function switchSong(songName: string) {
  if (songName === 'Beethoven') {
    songIndex = 0;
    lowestOctave = 3;
  } else if (songName === 'Bach') {
    songIndex = 1;
    lowestOctave = 4;
  }
}

function getSongIndex() {
  return songIndex;
}

function getLowestOctave() {
  return lowestOctave;
}

export { switchSong, getLowestOctave, getSongIndex };
