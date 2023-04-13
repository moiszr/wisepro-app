import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTasksPageRoutingModule } from './add-tasks-routing.module';

import { AddTasksPage } from './add-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTasksPageRoutingModule
  ],
  declarations: [AddTasksPage]
})
export class AddTasksPageModule {}
