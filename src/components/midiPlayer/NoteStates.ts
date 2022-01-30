const notes: any[] = [];
const amountOfNotes = 24;

function initializeNotes(amount: number) {
  for (let i = 0; i < amount; i += 1) {
    notes[i] = 0;
  }
}
// initializing the note state array
initializeNotes(amountOfNotes);

function getNoteDuration(index: number) {
  return notes[index];
}

function setNoteDuration(index: number, duration: any) {
  notes[index] = duration;
}

export { getNoteDuration, setNoteDuration };
