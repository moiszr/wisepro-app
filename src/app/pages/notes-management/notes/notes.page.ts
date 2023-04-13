import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Note } from 'src/app/services/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  searchVisible = false;
  sortColumn: keyof Note = 'title';
  sortAscending = true;
  note: Note[] = [];
  filteredNote: Note[] = [];
  searchTerm = '';

  constructor(
    private navCtrl: NavController,
    private noteService: NoteService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.note = this.noteService.getAllNotes();
    this.filteredNote = this.note;
    this.sortTable('title'); 
    console.log(this.note);
  }

  sortTable(column: keyof Note) {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.note.sort((a, b) => {
      const aValue = a[column] ?? '';
      const bValue = b[column] ?? '';

      if (aValue < bValue) {
        return this.sortAscending ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortAscending ? 1 : -1;
      }
      return 0;
    });
  }

  searchNote(searchTerm: string) {
    this.filteredNote = this.note.filter((note) => {
      return Object.values(note).some(value => {
        return (
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
  }

  navigateTo(route: string) {
    this.navCtrl.navigateRoot(route, { animated: false });
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  openNote(note: Note) {
    this.navCtrl.navigateForward(['/update-notes', note.note_id]);
  }

}
