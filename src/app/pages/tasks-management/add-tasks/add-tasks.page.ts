import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { User } from 'src/app/services/user';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.page.html',
  styleUrls: ['./add-tasks.page.scss'],
})
export class AddTasksPage implements OnInit {
  taskForm: FormGroup;
  taskTitle: string = '';
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private router: Router,
    private tasksService: TaskService,
    private utilities: UtilitiesService,
    private authService: AuthService
  ) {
    this.fetchUserData();
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      creation_date: [formatDate(new Date(), 'dd MMMM yyyy', 'en')],
      type: ['', Validators.required],
      priority: [null, Validators.required],
      expiration_date: [null, Validators.required],
      status: ['', Validators.required],
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
    this.resetForm();
  }
  
  async goBack() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      this.tasksService.addTask(taskData);
      await this.utilities.presentToast('bottom', 'Tarea Agregada correctamente');
      this.router.navigate(['/tasks']);
    } else if (this.canGoBack()) {
      this.router.navigate(['/tasks']);
    } else {
      await this.utilities.presentToast('bottom', 'Completa todos los campos');
    }
  }

  canGoBack(): boolean {
    let canGoBack = true;
  
    Object.keys(this.taskForm.controls).forEach((key) => {
      const control = this.taskForm.get(key);
      if (control!.dirty || control!.touched) {
        canGoBack = false;
      }
    });
  
    return canGoBack;
  }
  
  resetForm() {
    const currentDate = new Date();
    this.taskForm.reset({
      title: '',
      creation_date: [formatDate(new Date(), 'dd MMMM yyyy', 'en')],
      type: '',
      priority: null,
      expiration_date: this.utilities.formatDateForInput(currentDate),
      status: '',
      description: '',
    });
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
        console.log('No se ha creado la tarea');
        this.router.navigate(['/tasks']);
        break;
      case 'cancel':
        console.log('Cancelando la creación de la tarea');
        this.router.navigate(['/tasks']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }
}
