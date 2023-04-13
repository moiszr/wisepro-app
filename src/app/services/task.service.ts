import { Injectable } from '@angular/core';
import { Tasks } from './tasks';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Tasks[]>([]);
  tasks$: Observable<Tasks[]> = this.tasksSubject.asObservable();

  constructor() { 
    const initialTasks: Tasks[] = [
      {
        tasks_id: 1,
        title: 'Limpieza de la casa',
        description: 'Limpiar la casa de arriba a abajo',
        creation_date: new Date(),
        priority: 'Baja',
        type: 'Doméstico',
        expiration_date: new Date(),
        status: 'Pendiente',
        user_id: '1'
      },
      {
        tasks_id: 2,
        title: 'Comprar comestibles',
        description: 'Ir al supermercado y comprar comestibles para la semana',
        creation_date: new Date(),
        priority: 'Media',
        type: 'Compras',
        expiration_date: new Date(),
        status: 'En progreso',
        user_id: '1'
      },
      {
        tasks_id: 3,
        title: 'Pagar facturas',
        description: 'Pagar las facturas de agua, luz y gas',
        creation_date: new Date(),
        priority: 'Alta',
        type: 'Finanzas',
        expiration_date: new Date(),
        status: 'Completada',
        user_id: '1'
      }
    ];
    this.tasksSubject.next(initialTasks);
  }

  getTasks(): Tasks[] {
    return this.tasksSubject.getValue();
  }

  getTaskById(taskId: number): Tasks | undefined {
    const tasks = this.tasksSubject.getValue();
    return tasks.find(task => task.tasks_id === taskId);
  }

  addTask(task: Tasks): void {
    task.tasks_id = this.getLastTaskId() + 1;
    const tasks = this.tasksSubject.getValue();
    tasks.push(task);
    this.tasksSubject.next(tasks);
  }

  updateTask(updatedTask: Tasks): boolean {
    const tasks = this.tasksSubject.getValue();
    const taskIndex = tasks.findIndex(task => task.tasks_id === updatedTask.tasks_id);
  
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      this.tasksSubject.next(tasks);
      return true;
    } else {
      return false;
    }
  }

  deleteTask(taskId: number): boolean {
    const tasks = this.tasksSubject.getValue();
    const taskIndex = tasks.findIndex((task) => task.tasks_id === taskId);
  
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
      this.tasksSubject.next(tasks);
      return true;
    } else {
      return false;
    }
  }
  
  getLastTaskId(): number {
    const tasks = this.tasksSubject.getValue();
    return tasks.length > 0 ? tasks[tasks.length - 1].tasks_id : 0;
  }
}
