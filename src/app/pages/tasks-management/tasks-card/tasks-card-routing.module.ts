import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksCardPage } from './tasks-card.page';

const routes: Routes = [
  {
    path: '',
    component: TasksCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksCardPageRoutingModule {}
