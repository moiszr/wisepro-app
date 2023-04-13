import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateFinancePageRoutingModule } from './update-finance-routing.module';

import { UpdateFinancePage } from './update-finance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateFinancePageRoutingModule
  ],
  declarations: [UpdateFinancePage]
})
export class UpdateFinancePageModule {}
