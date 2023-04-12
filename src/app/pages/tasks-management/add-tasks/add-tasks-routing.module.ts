import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTasksPage } from './add-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: AddTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTasksPageRoutingModule {}
