import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { User } from 'src/app/services/user';
import { AuthService } from 'src/app/services/auth.service';
import { Note } from 'src/app/services/note';
import { NoteService } from 'src/app/services/note.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';

@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.page.html',
  styleUrls: ['./update-notes.page.scss'],
})
export class UpdateNotesPage implements OnInit {
  noteForm: FormGroup;
  noteTitle: string = '';
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private noteService: NoteService,
    private utilities: UtilitiesService,
    private authService: AuthService
  ) {
    this.fetchUserData();
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.utilities.coverImage();
    this.loadNote();
  }

  async fetchUserData() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.uid) {
      this.user = await this.authService.getUserData(user.uid);
    } else {
      this.user = null;
    }
  }

  loadNote() {
    const noteId = this.activatedRoute.snapshot.paramMap.get('noteId');
    if (noteId) {
      const note = this.noteService.getNoteById(parseInt(noteId, 10));
      if (note) {
        this.noteTitle = note.title || '';  
        this.noteForm.setValue({
          title: note.title,
          description: note.description,
        });
        this.utilities.coverImage();
      }
    }
  }

  canGoBack(): boolean {
    let canGoBack = true;
  
    Object.keys(this.noteForm.controls).forEach((key) => {
      if (key) {
        const control = this.noteForm.get(key);
        if (control!.dirty || control!.touched) {
          canGoBack = false;
        }
      }
    });
    return canGoBack;
  }

  async goBack() {
    const noteId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('noteId')!,
      10
    );
  
    if (!this.canGoBack()) {
      const noteData = this.noteForm.value;
  
      if (noteId) {
        const updatedNote: Note = {
          note_id: noteId,
          title: noteData.title,
          description: noteData.description,
          user_id: this.user?.uid ?? null,
        };
        console.log(updatedNote);
  
        if (this.noteService.updateNote(noteId, updatedNote)) {
          await this.utilities.presentToast(
            'bottom',
            'Nota actualizada correctamente'
          );
        } else {
          await this.utilities.presentToast(
            'bottom',
            'Se presentó un error al actualizar la nota'
          );
        }
      }
    }
    this.router.navigate(['/notes']);
  }

  async openActionsModal() {
    const modal = await this.modalController.create({
      component: ActionsModalPage,
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.performAction(result.data);
      }
    });
  
    return await modal.present();
  }

  performAction(actionType: string) {
    const noteId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('noteId')!,
      10
    );
  
    switch (actionType) {
      case 'delete':
        console.log('Borrar ingreso');
        if (this.noteService.deleteNote(noteId)) {
          console.log('nota eliminada correctamente');
          this.router.navigate(['/notes']);
        } else {
          console.log('Se presentó un error al eliminar la nota');
        }
        break;
      case 'cancel':
        console.log('Cancelando la actualización de la nota');
        this.router.navigate(['/notes']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }
}
