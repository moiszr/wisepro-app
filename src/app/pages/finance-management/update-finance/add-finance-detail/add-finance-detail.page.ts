import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { User } from 'src/app/services/user';
import { AuthService } from 'src/app/services/auth.service';
import { SavingsDetailService } from 'src/app/services/savings-details.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionsModalPage } from 'src/app/component/actions-modal/actions-modal.page';


@Component({
  selector: 'app-add-finance-detail',
  templateUrl: './add-finance-detail.page.html',
  styleUrls: ['./add-finance-detail.page.scss'],
})
export class AddFinanceDetailPage implements OnInit {
  financeForm: FormGroup;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
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
  }

  ionViewDidEnter() {
    this.resetForm();
  }

  async goBack() {
    const financeId = this.activatedRoute.snapshot.paramMap.get('financeId');
    console.log('Mi id de detalle tareas es el siguiente: ', financeId);
    if (this.financeForm.valid) {
      const financeData = this.financeForm.value;
      financeData.finance_id = financeId;
      this.savingsDetailService.addFinance(financeData);
      console.log(financeData);
      await this.utilities.presentToast('bottom', 'Detalle de ahorros Agregada');
      this.router.navigate(['/update-finance', financeId], { queryParams: { reload: true } });
    } else if (this.canGoBack()) {
      this.navCtrl.navigateBack(['/update-finance', financeId]);
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
    this.financeForm.reset({
      description: '',
      date: [formatDate(new Date(), 'dd MMMM yyyy', 'en')],
      amount: '',    
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
    const financeId = this.activatedRoute.snapshot.paramMap.get('financeId');
    switch (actionType) {
      case 'delete':
        console.log('No se ha creado el detalle');
        this.navCtrl.navigateBack(['/update-finance', financeId]);
        break;
      case 'cancel':
        console.log('Cancelando la creación del detalle');
        this.navCtrl.navigateBack(['/update-finance', financeId]);
        break;
      default:
        console.log('Acción desconocida');
    }
  }

}
