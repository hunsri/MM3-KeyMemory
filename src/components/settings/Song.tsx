import React from 'react';

import '../css/Settings.css';

/**
 * Displays one song.
 * @param holder
 * @returns
 */
const Song = function song(holder: { songName: string, disabled: boolean, onSongChoiceChange: any }) {
  /* Will send the button name (which is the song name) to parent class. */
  function songChoice() {
    holder.onSongChoiceChange(holder.songName);
  }

  return (
    <button type="button" onClick={songChoice} className="songNameButton" disabled={holder.disabled}>{holder.songName}</button>
  );
};

export default Song;
