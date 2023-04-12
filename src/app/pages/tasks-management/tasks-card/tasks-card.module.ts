import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksCardPageRoutingModule } from './tasks-card-routing.module';

import { TasksCardPage } from './tasks-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksCardPageRoutingModule
  ],
  declarations: [TasksCardPage]
})
export class TasksCardPageModule {}
