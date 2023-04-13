import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-actions-modal',
  templateUrl: './actions-modal.page.html',
  styleUrls: ['./actions-modal.page.scss'],
})

export class ActionsModalPage implements OnInit {
  actionSelected = new EventEmitter<string>();

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  action(actionType: string) {
    this.modalController.dismiss(actionType);
  }
}
