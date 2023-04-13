import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { User } from 'src/app/services/user';
import { AuthService } from 'src/app/services/auth.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.page.html',
  styleUrls: ['./add-expenses.page.scss'],
})
export class AddExpensesPage implements OnInit {
  financeForm: FormGroup;
  financeTitle: string = '';
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private router: Router,
    private financeService: FinanceService,
    private utilities: UtilitiesService,
    private authService: AuthService
  ) {
    this.fetchUserData();
    this.financeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['Expenses'],
      amount: ['', Validators.required],
      date: [null, Validators.required],
      type_expense: ['', Validators.required],   
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

  resetForm() {
    const currentDate = new Date();
    this.financeForm.reset({
      name: '',
      description: '',
      type: null,
      amount: '',
      date: this.utilities.formatDateForInput(currentDate),
      type_expense: null,      
    });
  }

  async goBack() {
    if (this.financeForm.valid) {
      const financeData = this.financeForm.value;
      financeData.user_id = this.user?.uid;
      financeData.type = 'Expenses'
      this.financeService.addFinance(financeData);
      await this.utilities.presentToast('bottom', 'Gastos Agregados');
      this.router.navigate(['/expenses']);
    } else if (this.canGoBack()) {
      this.router.navigate(['/expenses']);
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
        console.log('No se ha agregado el gasto');
        this.router.navigate(['/expenses']);
        break;
      case 'cancel':
        console.log('Cancelando la creación del gasto');
        this.router.navigate(['/expenses']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }

}
