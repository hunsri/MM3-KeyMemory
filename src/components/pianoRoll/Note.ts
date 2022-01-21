class Note {
    key: string;

    x: number;

    y: number;

    duration: number;

    pressed: any;

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
