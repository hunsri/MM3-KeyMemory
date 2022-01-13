import React from 'react';
import Key from './Key';
import '../css/Piano.css';

/**
 * A digital Pino.
 * @returns
 */
const Piano = function piano() {
  return (
    <div id="piano" className="piano">
      <Key note="whiteNote" keyLetter="C" keyNumber="4" keyboard="q" alternative="1" />
      <Key note="whiteNote" keyLetter="D" keyNumber="4" keyboard="w" alternative="2" />
      <Key note="whiteNote" keyLetter="E" keyNumber="4" keyboard="e" alternative="" />
      <Key note="whiteNote" keyLetter="F" keyNumber="4" keyboard="r" alternative="3" />
      <Key note="whiteNote" keyLetter="G" keyNumber="4" keyboard="t" alternative="4" />
      <Key note="whiteNote" keyLetter="A" keyNumber="4" keyboard="z" alternative="5" />
      <Key note="whiteNote" keyLetter="B" keyNumber="4" keyboard="u" alternative="" />

      <Key note="whiteNote" keyLetter="C" keyNumber="5" keyboard="a" alternative="6" />
      <Key note="whiteNote" keyLetter="D" keyNumber="5" keyboard="s" alternative="7" />
      <Key note="whiteNote" keyLetter="E" keyNumber="5" keyboard="d" alternative="" />
      <Key note="whiteNote" keyLetter="F" keyNumber="5" keyboard="f" alternative="8" />
      <Key note="whiteNote" keyLetter="G" keyNumber="5" keyboard="g" alternative="9" />
      <Key note="whiteNote" keyLetter="A" keyNumber="5" keyboard="h" alternative="0" />
      <Key note="whiteNote" keyLetter="B" keyNumber="5" keyboard="j" alternative="" />

      <p id="hintText">Press x to see which keys you need to press and c to hide it.</p>
    </div>
  );
};

export { Piano };
