import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateTasksPage } from './update-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateTasksPageRoutingModule {}
