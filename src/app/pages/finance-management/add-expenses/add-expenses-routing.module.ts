import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExpensesPage } from './add-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpensesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExpensesPageRoutingModule {}
