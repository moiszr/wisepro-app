import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateFinancePage } from './update-finance.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateFinancePage,
    children: [
      {
        path: 'add-finance-detail',
        loadChildren: () => import('./add-finance-detail/add-finance-detail.module').then( m => m.AddFinanceDetailPageModule)
      },
      {
        path: 'update-finance-detail/:finance-detail_id',
        loadChildren: () => import('./update-finance-detail/update-finance-detail.module').then( m => m.UpdateFinanceDetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateFinancePageRoutingModule {}
