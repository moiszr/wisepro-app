import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFinancePageRoutingModule } from './add-finance-routing.module';

import { AddFinancePage } from './add-finance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddFinancePageRoutingModule
  ],
  declarations: [AddFinancePage]
})
export class AddFinancePageModule {}
