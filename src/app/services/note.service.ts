import { Injectable } from '@angular/core';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];

  constructor() {}

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNoteById(note_id: number): Note | undefined {
    return this.notes.find((note) => note.note_id === note_id);
  }

  addNote(note: Note): void {
    note.note_id = this.getNoteId() + 1;
    this.notes.push(note);
  }

  updateNote(note_id: number, updatedNote: Note): boolean {
    const index = this.notes.findIndex((note) => note.note_id === note_id);

    if (index !== -1) {
      this.notes[index] = updatedNote;
      return true;
    }
    return false;
  }

  deleteNote(note_id: number): boolean {
    const index = this.notes.findIndex((note) => note.note_id === note_id);

    if (index !== -1) {
      this.notes.splice(index, 1);
      return true;
    }
    return false;
  }

  getNoteId(): number {
    const note = this.notes;
    return note.length > 0 ? note[note.length - 1].note_id : 0;
  }
}
