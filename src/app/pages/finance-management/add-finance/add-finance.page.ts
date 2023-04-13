import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { User } from 'src/app/services/user';
import { AuthService } from 'src/app/services/auth.service';
import { SavingService } from 'src/app/services/savings.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.page.html',
  styleUrls: ['./add-finance.page.scss'],
})
export class AddFinancePage implements OnInit {
  financeForm: FormGroup;
  financeTitle: string = '';
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private router: Router,
    private savingService: SavingService,
    private utilities: UtilitiesService,
    private authService: AuthService
  ) { 
    this.fetchUserData();
    this.financeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [formatDate(new Date(), 'dd MMMM yyyy', 'en')],
      amount: ['', Validators.required],
      end_date: [null, Validators.required],
      type: ['', Validators.required],   
      user_id: [this.user?.uid ?? null],
    });
  }

  ngOnInit() {
    this.utilities.coverImage();
  }

  async fetchUserData() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.uid) {
      this.user = await this.authService.getUserData(user.uid);
    } else {
      this.user = null;
    }
  }

  ionViewDidEnter() {
    this.utilities.coverImage();
    this.resetForm();
  }

  async goBack() {
    if (this.financeForm.valid) {
      const financeData = this.financeForm.value;
      financeData.user_id = this.user?.uid;
      this.savingService.addSaving(financeData);
      await this.utilities.presentToast('bottom', 'Meta de ahorros Agregada');
      this.router.navigate(['/finance']);
    } else if (this.canGoBack()) {
      this.router.navigate(['/finance']);
    } else {
      await this.utilities.presentToast('bottom', 'Completa todos los campos');
    }
  }

  canGoBack(): boolean {
    let canGoBack = true;
  
    Object.keys(this.financeForm.controls).forEach((key) => {
      const control = this.financeForm.get(key);
      if (control!.dirty || control!.touched) {
        canGoBack = false;
      }
    });
    return canGoBack;
  }

  resetForm() {
    const currentDate = new Date();
    this.financeForm.reset({
      name: '',
      description: '',
      start_date: [formatDate(new Date(), 'dd MMMM yyyy', 'en')],
      amount: '',
      end_date: this.utilities.formatDateForInput(currentDate),
      type: null,      
    });
  }

  async openActionsModal() {
    const modal = await this.modalController.create({
      component: ActionsModalPage,
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.performAction(result.data);
      }
    });
    return await modal.present();
  }

  performAction(actionType: string) {
    switch (actionType) {
      case 'delete':
        console.log('No se ha creado la meta');
        this.router.navigate(['/finance']);
        break;
      case 'cancel':
        console.log('Cancelando la creación de la meta');
        this.router.navigate(['/finance']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }

}
