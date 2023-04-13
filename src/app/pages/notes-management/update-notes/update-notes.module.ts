import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNotesPageRoutingModule } from './update-notes-routing.module';

import { UpdateNotesPage } from './update-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateNotesPageRoutingModule
  ],
  declarations: [UpdateNotesPage]
})
export class UpdateNotesPageModule {}
