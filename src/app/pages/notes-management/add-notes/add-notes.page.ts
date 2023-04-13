import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { User } from 'src/app/services/user';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.page.html',
  styleUrls: ['./add-notes.page.scss'],
})
export class AddNotesPage implements OnInit {
  noteForm: FormGroup;
  noteTitle: string = '';
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
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
      user_id: [this.user?.uid ?? null],
    });
  }

  ngOnInit() {
    this.utilities.coverImage();
  }

  async fetchUserData() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.uid) {
      this.user = await this.authService.getUserData(user.uid);
    } else {
      this.user = null;
    }
  }

  ionViewDidEnter() {
    this.utilities.coverImage();
    this.resetForm();
  }

  resetForm() {
    this.noteForm.reset({
      title: '',
      description: '',   
    });
  }

  async goBack() {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;
      noteData.user_id = this.user?.uid;
      this.noteService.addNote(noteData);
      await this.utilities.presentToast('bottom', 'Nota Agregada');
      this.router.navigate(['/notes']);
    } else if (this.canGoBack()) {
      this.router.navigate(['/notes']);
    } else {
      await this.utilities.presentToast('bottom', 'Completa todos los campos');
    }
  }

  canGoBack(): boolean {
    let canGoBack = true;
  
    Object.keys(this.noteForm.controls).forEach((key) => {
      const control = this.noteForm.get(key);
      if (control!.dirty || control!.touched) {
        canGoBack = false;
      }
    });
    return canGoBack;
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
    switch (actionType) {
      case 'delete':
        console.log('No se ha creado la nota');
        this.router.navigate(['/notes']);
        break;
      case 'cancel':
        console.log('Cancelando la creación de la nota');
        this.router.navigate(['/notes']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }

}
