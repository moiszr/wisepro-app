import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { User } from 'src/app/services/user';
import { Tasks } from 'src/app/services/tasks';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.page.html',
  styleUrls: ['./update-tasks.page.scss'],
})
export class UpdateTasksPage implements OnInit {
  taskForm: FormGroup;
  taskTitle: string = '';
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private tasksService: TaskService,
    private utilities: UtilitiesService,
    private authService: AuthService
  ) {
    this.fetchUserData();
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      creation_date: null,
      type: ['', Validators.required],
      priority: [null, Validators.required],
      expiration_date: [Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.utilities.coverImage();
    this.loadTask();
  }

  async fetchUserData() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.uid) {
      this.user = await this.authService.getUserData(user.uid);
    } else {
      this.user = null;
    }
  }

  loadTask() {
    const taskId = this.activatedRoute.snapshot.paramMap.get('taskId');
    if (taskId) {
      const task = this.tasksService.getTaskById(parseInt(taskId, 10));
      if (task) {
        this.taskTitle = task.title || '';  
        this.taskForm.setValue({
          title: task.title,
          creation_date: formatDate(new Date(task.creation_date!), 'dd MMMM yyyy', 'en'),
          type: task.type,
          priority: task.priority,
          expiration_date: new Date(task.expiration_date!),
          status: task.status,
          description: task.description,
        });
        this.utilities.coverImage();
      }
    }
  }  

  canGoBack(): boolean {
    let canGoBack = true;
  
    Object.keys(this.taskForm.controls).forEach((key) => {
      if (key !== 'creation_date' && key !== 'expiration_date') {
        const control = this.taskForm.get(key);
        if (control!.dirty || control!.touched) {
          canGoBack = false;
        }
      }
    });
  
    return canGoBack;
  }

  async goBack() {
    const taskId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('taskId')!,
      10
    );
  
    if (!this.canGoBack()) {
      const taskData = this.taskForm.value;
  
      if (taskId) {
        const updatedTask: Tasks = {
          tasks_id: taskId,
          title: taskData.title,
          description: taskData.description,
          creation_date: taskData.creation_date,
          priority: taskData.priority,
          type: taskData.type,
          expiration_date: taskData.expiration_date,
          status: taskData.status,
          user_id: this.user?.uid ?? null,
        };
        console.log(updatedTask);
  
        if (this.tasksService.updateTask(updatedTask)) {
          await this.utilities.presentToast(
            'bottom',
            'Tarea actualizada correctamente'
          );
        } else {
          await this.utilities.presentToast(
            'bottom',
            'Se presentó un error al actualizar la tarea'
          );
        }
      }
    }
  
    this.router.navigate(['/tasks']);
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
    const taskId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('taskId')!,
      10
    );
  
    switch (actionType) {
      case 'delete':
        console.log('Borrar tarea');
        if (this.tasksService.deleteTask(taskId)) {
          console.log('Tarea eliminada correctamente');
          this.router.navigate(['/tasks']);
        } else {
          console.log('Se presentó un error al eliminar la tarea');
        }
        break;
      case 'cancel':
        console.log('Cancelando la actualización de la tarea');
        this.router.navigate(['/tasks']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }
}
