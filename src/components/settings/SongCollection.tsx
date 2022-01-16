import React from 'react';
import Song from './Song';

import '../css/Settings.css';

const SongCollection = function songCollection(holder: {
  gameStarted: boolean, songNameArray: Array<string>,
  onSongChoiceChange: any, songChoice: string
}) {
  let disableSongs = false;
  const defaultTitle = 'Choose a song and press start';

  // Will disable song buttons if the game started.
  if (holder.gameStarted === true && holder.songChoice !== defaultTitle) {
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
