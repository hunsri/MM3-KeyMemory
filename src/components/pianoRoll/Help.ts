import Note from './Note';

function drawKey(context: any, y: number, keytype: number, duration: number): void {
  context.fillRect(0, y, keytype, duration);
}

function clearCanvas(context: any, width: any, height: any): void {
  context.clearRect(0, 0, width, height);
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function spawnMidi(height: number): any {
  const a = new Note('whiteKey', height, getRandomInt(50), 'blue');
  return a;
}

export {
  drawKey,
  clearCanvas,
  getRandomInt,
  spawnMidi,
};
