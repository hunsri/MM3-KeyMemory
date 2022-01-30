import React from 'react';
import Song from './Song';

import '../css/Settings.css';

/**
 * Contains and displays a bunch of songs.
 * @param holder
 * @returns
 */
const SongCollection = function songCollection(holder: {
  gameStarted: boolean, songNameArray: Array<string>,
  onSongChoiceChange: any, songChoice: string
}) {
  /* Diables a song to make it not clickable */
  let disableSongs = false;

  /* Is the default text at the top of our program which shows that the user didn't choose a song yet */
  const defaultTitle = 'Choose a song and press start';

  /* Will disable song buttons if the game started. */
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
