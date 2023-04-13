import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

import { User } from 'src/app/services/user';
import { Saving } from 'src/app/services/savings';
import { FinanceDetail } from 'src/app/services/savingsDetail';
import { AuthService } from 'src/app/services/auth.service';
import { SavingService } from 'src/app/services/savings.service';
import { SavingsDetailService } from 'src/app/services/savings-details.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';


@Component({
  selector: 'app-update-finance-detail',
  templateUrl: './update-finance-detail.page.html',
  styleUrls: ['./update-finance-detail.page.scss'],
})
export class UpdateFinanceDetailPage implements OnInit {
  private routeSub: Subscription = new Subscription();
  financeForm: FormGroup;
  financeTitle: string = '';
  finance_Id: number = 0;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private navCtrl: NavController,
    private savingService: SavingService,
    private savingsDetailService: SavingsDetailService,
    private utilities: UtilitiesService,
    private authService: AuthService
  ) { 
    this.financeForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: [formatDate(new Date(), 'dd MMMM yyyy', 'en')],
      amount: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadFinance();
  }

  loadFinance() {
    const financeDetail_id = this.activatedRoute.snapshot.paramMap.get('financeDetail_id');
    console.log(financeDetail_id);
    if (financeDetail_id) {
      const financeDetail = this.savingsDetailService.getFinanceById(parseInt(financeDetail_id, 10));
      if (financeDetail) {
        this.finance_Id = parseInt(financeDetail.finance_id!, 10);
        this.financeForm.setValue({
          description: financeDetail.description,
          date: formatDate(new Date(financeDetail.date!), 'dd MMMM yyyy', 'en'),
          amount: financeDetail.amount,
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
    const financeId = parseInt(this.activatedRoute.snapshot.paramMap.get('financeDetail_id')!,10);
  
    if (!this.canGoBack()) {
      const financeData = this.financeForm.value;
      if (financeId) {
        const updatedFinance: FinanceDetail = {
          finance_detail_id: financeId,
          description: financeData.description,
          date: financeData.date,
          amount: financeData.amount,
          finance_id: this.finance_Id.toString(),
        };
        console.log(updatedFinance);
  
        if (this.savingsDetailService.updateFinance(financeId, updatedFinance)) {
          await this.utilities.presentToast(
            'bottom',
            'Detalle actualizado correctamente'
          );
        } else {
          await this.utilities.presentToast(
            'bottom',
            'Se presentó un error al actualizar el detalle'
          );
        }
      }
    }
    this.router.navigate(['/update-finance', financeId], { queryParams: { reload: true } });
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
    const financeId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('financeId')!,
      10
    );
  
    switch (actionType) {
      case 'delete':
        console.log('Borrar tarea');
        if (this.savingsDetailService.deleteFinance(financeId)) {
          console.log('Ahorro eliminado correctamente');
          this.navCtrl.navigateBack(['/update-finance', financeId]);
        } else {
          console.log('Se presentó un error al eliminar el ahorro');
        }
        break;
      case 'cancel':
        console.log('Cancelando la actualización del ahorro');
        this.navCtrl.navigateBack(['/update-finance', financeId]);
        break;
      default:
        console.log('Acción desconocida');
    }
  }
}
