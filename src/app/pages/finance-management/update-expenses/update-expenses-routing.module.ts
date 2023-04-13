import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateExpensesPage } from './update-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateExpensesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateExpensesPageRoutingModule {}
