/**
 * Will be created for each stripe.
 */
class Note {
  /* Id of each note */
  key: string;

  /* X-Axis value */
  x: number;

  /* Y-Axis value */
  y: number;

  /* Speed of each note */
  duration: number;

  /* Color of a note */
  color: string;

  constructor(key: string, y: number, duration: number, color: string) {
    this.key = key;
    this.x = 0;
    this.y = y;
    this.duration = duration;
    this.color = color;
  }

  addDuration(dur: number) {
    this.duration += dur;
  }

  getDuration() {
    return this.duration;
  }
}

export default Note;
