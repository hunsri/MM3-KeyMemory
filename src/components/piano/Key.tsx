import React, { useState } from 'react';
import '../css/Piano.css';

const blackNote = 'blackNote';

/**
 * Finds out if a white key got a black key.
 * @param keyLetter
 * @returns
 */
function findSharp(keyLetter: string) {
  if (keyLetter !== 'E') {
    if (keyLetter !== 'B') {
      return true;
    }
  }
  return false;
}

/**
 * Creates a white key with or without a black key.
 * @param holder
 * @returns
 */
const Key = function key(holder: {
  note: string, keyLetter: string, keyNumber: string,
  keyboard: string, alternative: string | undefined
}) {
  const hasSharp = findSharp(holder.keyLetter);
  const keyName = `${holder.keyLetter}${holder.keyNumber}`;
  const blackNoteExtra = `${holder.keyLetter}#${holder.keyNumber}`;
  const [keyboardHintIsVisible, setKeyboardHintIsVisible] = useState(false);
  const [noSharpIsPressed, setNoSharpIsPressed] = useState(false);
  const [sharpIsPressed, setSharpIsPressed] = useState(false);

  // Changes the color of a key (white -> gray / black -> gray).
  const handleDoubleInput = (event: any) => {
    if (!event.repeat) {
      if (event.key === holder.keyboard) {
        setNoSharpIsPressed(true);
      }
      if (event.key === holder.alternative) {
        setSharpIsPressed(true);
      }
    }
  };

  // Changes the color of a key (gray -> white / gray -> black).
  const handleDoubleInputEnd = (event: any) => {
    if (event.key === holder.keyboard) {
      setNoSharpIsPressed(false);
    }
    if (event.key === holder.alternative) {
      setSharpIsPressed(false);
    }
  };

  // Changes the color of a key (white -> gray).
  const handleSingleInput = (event: any) => {
    if (!event.repeat) {
      if (event.key === holder.keyboard) {
        setNoSharpIsPressed(true);
      }
    }
  };

  // Changes the color of a key (gray -> white).
  const handleSingleInputEnd = (event: any) => {
    if (event.key === holder.keyboard) {
      setNoSharpIsPressed(false);
    }
  };

  // Changes the text below keyboard.
  const handleKeyboardHint = (event: any) => {
    if (event.key === 'x') {
      setKeyboardHintIsVisible(true);
    }
    if (event.key === 'c') {
      setKeyboardHintIsVisible(false);
    }
  };

  React.useEffect(() => {
    if (hasSharp) {
      window.addEventListener('keydown', handleDoubleInput);
      window.addEventListener('keyup', handleDoubleInputEnd);
      window.addEventListener('keypress', handleKeyboardHint);

      return () => {
        window.removeEventListener('keydown', handleDoubleInput);
        window.removeEventListener('keyup', handleDoubleInputEnd);
        window.removeEventListener('keypress', handleKeyboardHint);
      };
    }
    window.addEventListener('keydown', handleSingleInput);
    window.addEventListener('keyup', handleSingleInputEnd);
    window.addEventListener('keypress', handleKeyboardHint);

    return () => {
      window.removeEventListener('keydown', handleSingleInput);
      window.removeEventListener('keyup', handleSingleInputEnd);
      window.removeEventListener('keypress', handleKeyboardHint);
    };
  }, []);

  if (hasSharp) {
    return (
      <div className={holder.note} data-code={keyName} aria-hidden style={{ backgroundColor: noSharpIsPressed ? '#ccc' : 'white' }}>
        <div className={blackNote} data-code={blackNoteExtra} aria-hidden style={{ backgroundColor: sharpIsPressed ? '#777' : 'black' }}>
          <p className="blackNoteHint" style={{ visibility: keyboardHintIsVisible ? 'visible' : 'hidden' }}>{holder.alternative}</p>
        </div>
        <p className="whiteNoteHint" style={{ visibility: keyboardHintIsVisible ? 'visible' : 'hidden' }}>{holder.keyboard}</p>
      </div>
    );
  }
  return (
    <div className={holder.note} data-code={keyName} aria-hidden style={{ backgroundColor: noSharpIsPressed ? '#ccc' : 'white' }}>
      <p className="whiteNoteHint" style={{ visibility: keyboardHintIsVisible ? 'visible' : 'hidden' }}>{holder.keyboard}</p>
    </div>
  );
};

export default Key;
