import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateTasksPageRoutingModule } from './update-tasks-routing.module';

import { UpdateTasksPage } from './update-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateTasksPageRoutingModule
  ],
  declarations: [UpdateTasksPage]
})
export class UpdateTasksPageModule {}
