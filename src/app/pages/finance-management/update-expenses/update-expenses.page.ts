import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { User } from 'src/app/services/user';
import { AuthService } from 'src/app/services/auth.service';
import { Finance } from 'src/app/services/finance';
import { FinanceService } from 'src/app/services/finance.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';

@Component({
  selector: 'app-update-expenses',
  templateUrl: './update-expenses.page.html',
  styleUrls: ['./update-expenses.page.scss'],
})
export class UpdateExpensesPage implements OnInit {
  financeForm: FormGroup;
  financeTitle: string = '';
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
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
      type_expense: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.utilities.coverImage();
    this.loadFinance();
  }

  async fetchUserData() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.uid) {
      this.user = await this.authService.getUserData(user.uid);
    } else {
      this.user = null;
    }
  }

  loadFinance() {
    const financeId = this.activatedRoute.snapshot.paramMap.get('financeId');
    if (financeId) {
      const finance = this.financeService.getFinanceById(parseInt(financeId, 10));
      if (finance) {
        this.financeTitle = finance.name || '';  
        this.financeForm.setValue({
          name: finance.name,
          description: finance.description,
          type: finance.type,
          amount: finance.amount,
          date: formatDate(new Date(finance.date!), 'dd MMMM yyyy', 'en'),
          type_expense: finance.type_expense,
        });
        this.utilities.coverImage();
      }
    }
  }

  canGoBack(): boolean {
    let canGoBack = true;
  
    Object.keys(this.financeForm.controls).forEach((key) => {
      if (key !== 'date') {
        const control = this.financeForm.get(key);
        if (control!.dirty || control!.touched) {
          canGoBack = false;
        }
      }
    });
    return canGoBack;
  }

  async goBack() {
    const financeId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('financeId')!,
      10
    );
  
    if (!this.canGoBack()) {
      const financeData = this.financeForm.value;
  
      if (financeId) {
        const updatedFinance: Finance = {
          finance_id: financeId,
          name: financeData.name,
          description: financeData.description,
          type: 'Expenses',
          amount: financeData.amount,
          date: financeData.date,
          type_expense: financeData.type_expense,
          user_id: this.user?.uid ?? null,
        };
        console.log(updatedFinance);
  
        if (this.financeService.updateFinance(financeId, updatedFinance)) {
          await this.utilities.presentToast(
            'bottom',
            'Gasto actualizado correctamente'
          );
        } else {
          await this.utilities.presentToast(
            'bottom',
            'Se presentó un error al actualizar el gasto'
          );
        }
      }
    }
    this.router.navigate(['/expenses']);
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
    const taskId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('taskId')!,
      10
    );
  
    switch (actionType) {
      case 'delete':
        console.log('Borrar Gasto');
        if (this.financeService.deleteFinance(taskId)) {
          console.log('gasto eliminado correctamente');
          this.router.navigate(['/expenses']);
        } else {
          console.log('Se presentó un error al eliminar el ingreso');
        }
        break;
      case 'cancel':
        console.log('Cancelando la actualización del gasto');
        this.router.navigate(['/expenses']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }

}
