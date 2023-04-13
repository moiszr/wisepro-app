import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFinancePage } from './add-finance.page';

const routes: Routes = [
  {
    path: '',
    component: AddFinancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFinancePageRoutingModule {}
