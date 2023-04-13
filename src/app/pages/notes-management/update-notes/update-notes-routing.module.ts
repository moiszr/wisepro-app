import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNotesPage } from './update-notes.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateNotesPageRoutingModule {}
