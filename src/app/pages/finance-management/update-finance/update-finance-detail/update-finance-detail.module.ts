import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateFinanceDetailPageRoutingModule } from './update-finance-detail-routing.module';

import { UpdateFinanceDetailPage } from './update-finance-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateFinanceDetailPageRoutingModule
  ],
  declarations: [UpdateFinanceDetailPage]
})
export class UpdateFinanceDetailPageModule {}
