import React from 'react';
import '../css/Settings.css';
import Song from './Song';

const SongCollection = function songCollection(holder: { gameStarted: boolean, songNameArray: Array<string>, onSongChoiceChange: any }) {
  let disableSongs = false;

  // Will disable song buttons if the game started.
  if (holder.gameStarted === true) {
    disableSongs = true;
  } else {
    disableSongs = false;
  }

  return (
    <div className="songCollectionComponent">
      Choose a song
      <div>
        <Song songName={holder.songNameArray[0]} disabled={disableSongs} onSongChoiceChange={holder.onSongChoiceChange} />
        <Song songName={holder.songNameArray[1]} disabled={disableSongs} onSongChoiceChange={holder.onSongChoiceChange} />
      </div>
    </div>
  );
};

export default SongCollection;
