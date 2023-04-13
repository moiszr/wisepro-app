import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFinanceDetailPageRoutingModule } from './add-finance-detail-routing.module';

import { AddFinanceDetailPage } from './add-finance-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddFinanceDetailPageRoutingModule
  ],
  declarations: [AddFinanceDetailPage]
})
export class AddFinanceDetailPageModule {}
