import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionsModalPage } from './actions-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ActionsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionsModalPageRoutingModule {}
