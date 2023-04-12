import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tasks } from '../../../services/tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
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
    this.filteredTasks = this.tasks;
    this.sortTable('expiration_date'); 
    console.log(this.tasks);
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

  sortTable(column: keyof Tasks) {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.tasks.sort((a, b) => {
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

  searchTasks(searchTerm: string) {
    this.filteredTasks = this.tasks.filter((task) => {
      return Object.values(task).some(value => {
        return (
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
  }

  filterTasks(status: string) {
    if (!status) {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status && task.status.toLowerCase() === status.toLowerCase());
    }
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
