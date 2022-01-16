import React, { useState } from 'react';

import '../css/Piano.css';

const whiteNote = 'whiteNote';
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
  keyLetter: string, keyNumber: string,
  keyboard: string, alternative: string | undefined,
  inputDevice: any
}) {
  const hasSharp = findSharp(holder.keyLetter);
  const keyName = `${holder.keyLetter}${holder.keyNumber}`;
  const blackNoteExtra = `${holder.keyLetter}#${holder.keyNumber}`;
  const [keyboardHintIsVisible, setKeyboardHintIsVisible] = useState(false);
  const [noSharpIsPressed, setNoSharpIsPressed] = useState(false);
  const [sharpIsPressed, setSharpIsPressed] = useState(false);

  // Changes the color of a key (white -> gray / black -> gray).
  const handleInput = (event: any) => {
    if (!event.repeat) {
      if (hasSharp === true) {
        if (event.key === holder.keyboard) {
          setNoSharpIsPressed(true);
        }
        if (event.key === holder.alternative) {
          setSharpIsPressed(true);
        }
      }
      if (event.key === holder.keyboard) {
        setNoSharpIsPressed(true);
      }
    }
  };

  // Changes the color of a key (gray -> white / gray -> black).
  const handleInputEnd = (event: any) => {
    if (hasSharp === true) {
      if (event.key === holder.keyboard) {
        setNoSharpIsPressed(false);
      }
      if (event.key === holder.alternative) {
        setSharpIsPressed(false);
      }
    }
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
    if (holder.inputDevice !== null) {
      console.log('Device linked');
      holder.inputDevice.addListener('noteon', (e: { note: { identifier: any; }; }) => {
        if (hasSharp === true) {
          if (e.note.identifier === holder.keyboard) {
            setNoSharpIsPressed(true);
          }
          if (e.note.identifier === holder.alternative) {
            setSharpIsPressed(true);
          }
        } else if (e.note.identifier === holder.keyboard) {
          setNoSharpIsPressed(true);
        }
      });

      holder.inputDevice.addListener('noteoff', (e: { note: { identifier: any; }; }) => {
        if (hasSharp === true) {
          if (e.note.identifier === holder.keyboard) {
            setNoSharpIsPressed(false);
          }
          if (e.note.identifier === holder.alternative) {
            setSharpIsPressed(false);
          }
        } else if (e.note.identifier === holder.keyboard) {
          setNoSharpIsPressed(false);
        }
      });
    }

    window.addEventListener('keydown', handleInput);
    window.addEventListener('keyup', handleInputEnd);
    window.addEventListener('keypress', handleKeyboardHint);

    return () => {
      window.removeEventListener('keydown', handleInput);
      window.removeEventListener('keyup', handleInputEnd);
      window.removeEventListener('keypress', handleKeyboardHint);
    };
  }, []);

  if (hasSharp) {
    return (
      <div
        className={whiteNote}
        data-code={keyName}
        aria-hidden
        style={{ backgroundColor: noSharpIsPressed ? '#ccc' : 'white' }}
      >
        <div
          className={blackNote}
          data-code={blackNoteExtra}
          aria-hidden
          style={{ backgroundColor: sharpIsPressed ? '#777' : 'black' }}
        >
          <p className="blackNoteHint" style={{ visibility: keyboardHintIsVisible ? 'visible' : 'hidden' }}>{holder.alternative}</p>
        </div>
        <p className="whiteNoteWithSharpHint" style={{ visibility: keyboardHintIsVisible ? 'visible' : 'hidden' }}>{holder.keyboard}</p>
      </div>
    );
  }
  return (
    <div
      className={whiteNote}
      data-code={keyName}
      aria-hidden
      style={{ backgroundColor: noSharpIsPressed ? '#ccc' : 'white' }}
    >
      <p className="whiteNoteWithoutSharpHint" style={{ visibility: keyboardHintIsVisible ? 'visible' : 'hidden' }}>{holder.keyboard}</p>
    </div>
  );
};

export default Key;
