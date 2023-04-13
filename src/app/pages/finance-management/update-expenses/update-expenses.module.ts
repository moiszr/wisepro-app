import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateExpensesPageRoutingModule } from './update-expenses-routing.module';

import { UpdateExpensesPage } from './update-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateExpensesPageRoutingModule
  ],
  declarations: [UpdateExpensesPage]
})
export class UpdateExpensesPageModule {}
