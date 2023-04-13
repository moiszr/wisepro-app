import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateIncomePageRoutingModule } from './update-income-routing.module';

import { UpdateIncomePage } from './update-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateIncomePageRoutingModule
  ],
  declarations: [UpdateIncomePage]
})
export class UpdateIncomePageModule {}
