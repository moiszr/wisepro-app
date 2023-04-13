import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNotesPageRoutingModule } from './add-notes-routing.module';

import { AddNotesPage } from './add-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddNotesPageRoutingModule
  ],
  declarations: [AddNotesPage]
})
export class AddNotesPageModule {}
