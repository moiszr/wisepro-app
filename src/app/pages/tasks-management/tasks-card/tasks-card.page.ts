import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tasks } from '../../../services/tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.page.html',
  styleUrls: ['./tasks-card.page.scss'],
})
export class TasksCardPage implements OnInit {
  searchVisible = false;
  public selectedStatus = '';
  sortColumn: keyof Tasks = 'title';
  sortAscending = true;
  tasks: Tasks[] = [];
  filteredTasks: Tasks[] = [];
  searchTerm = '';

  constructor(
    private navCtrl: NavController,
    private taskService: TaskService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    console.log(this.tasks);
    this.filterTasks();
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesStatus = this.selectedStatus ? task.status === this.selectedStatus : true;
      const matchesSearch = Object.values(task).some((value) => {
        return (
          typeof value === 'string' &&
          value.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
      return matchesStatus && matchesSearch;
    });
  }

  getTasksByStatus(status: string) {
    return this.filteredTasks.filter((task) => {
      switch (status) {
        case 'Pendiente':
          return task.status === 'Pendiente';
        case 'En progreso':
          return task.status === 'En progreso';
        case 'Completada':
          return task.status === 'Completada';
        default:
          return false;
      }
    });
  }  

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'status-pending';
      case 'En progreso':
        return 'status-in-progress';
      case 'Completada':
        return 'status-completed';
      default:
        return '';
    }
  }

  searchTasks(searchTerm: string) {
    this.filteredTasks = this.tasks.filter((task) => {
      return Object.values(task).some(value => {
        return (
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
    this.filterTasks();
  }

  navigateTo(route: string) {
    this.navCtrl.navigateRoot(route, { animated: false });
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  openTask(task: Tasks) {
    this.navCtrl.navigateForward(['/update-tasks', task.tasks_id]);
  }
}
