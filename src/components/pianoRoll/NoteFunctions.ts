import Note from './Note';

/**
 * Draws a note.
 * @param context note context
 * @param y Y-Axis as number
 * @param keytype note width
 * @param duration note duration
 */
function drawKey(context: any, y: number, keytype: number, duration: number): void {
  context.fillRect(0, y, keytype, duration);
}

/**
 * Deletes a note.
 * @param context note context
 * @param width note width
 * @param height note height
 */
function clearCanvas(context: any, width: any, height: any): void {
  context.clearRect(0, 0, width, height);
}

/**
 * Creates a random number between 0 and max (which is a given parameter).
 * @param max is upper bound.
 * @returns a random number.
 */
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Creates a MIDI stripe.
 * @param height height where it spawns.
 * @returns a new note.
 */
function spawnStripe(height: number, duration: number): any {
  const a = new Note('', height, duration, 'blue');
  return a;
}

export {
  drawKey,
  clearCanvas,
  getRandomInt,
  spawnStripe,
};
