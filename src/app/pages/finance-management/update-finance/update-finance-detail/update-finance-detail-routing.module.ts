import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateFinanceDetailPage } from './update-finance-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateFinanceDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateFinanceDetailPageRoutingModule {}
