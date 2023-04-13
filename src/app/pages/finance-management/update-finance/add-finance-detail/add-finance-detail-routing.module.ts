import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFinanceDetailPage } from './add-finance-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AddFinanceDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFinanceDetailPageRoutingModule {}
