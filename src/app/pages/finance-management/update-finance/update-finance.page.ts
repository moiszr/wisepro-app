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
  selector: 'app-update-finance',
  templateUrl: './update-finance.page.html',
  styleUrls: ['./update-finance.page.scss'],
})
export class UpdateFinancePage implements OnInit, OnDestroy {
  private routeSub: Subscription = new Subscription();
  financeForm: FormGroup;
  financeTitle: string = '';
  finance_Id: number = 0;
  user: User | null = null;

  searchVisible = false;
  sortColumn: keyof FinanceDetail = 'date';
  sortAscending = true;
  finance: FinanceDetail[] = [];
  filteredFinance: FinanceDetail[] = [];
  searchTerm = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private navCtrl: NavController,
    private savingService: SavingService,
    private savingsDetailService:SavingsDetailService,
    private utilities: UtilitiesService,
    private authService: AuthService
  ) { 
    this.fetchUserData();
    this.financeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: null,
      amount: ['', Validators.required],
      end_date: [Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadFinance();
    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['reload']) {
        this.loadFinance();
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
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
    this.utilities.coverImage();
    const financeId = this.activatedRoute.snapshot.paramMap.get('financeId');
    this.finance_Id = parseInt(financeId!, 10);
    
    if (financeId) {
      const finance = this.savingService.getSavingById(parseInt(financeId, 10));
      if (finance) {
        this.financeTitle = finance.name || '';  
        this.financeForm.setValue({
          name: finance.name,
          description: finance.description,
          start_date: formatDate(new Date(finance.start_date!), 'dd MMMM yyyy', 'en'),
          amount: finance.amount,
          end_date: new Date(finance.end_date!),
          type: finance.type,          
        });
      }
      console.log('Mi id es el siguiente: ', financeId);
      this.finance = this.savingsDetailService.getAllFinances(parseInt(financeId!, 10));
      this.filteredFinance = this.finance;
      this.sortTable('date'); 
      console.log(this.finance);
    }
  }  

  canGoBack(): boolean {
    let canGoBack = true;
  
    Object.keys(this.financeForm.controls).forEach((key) => {
      if (key !== 'start_date' && key !== 'end_date') {
        const control = this.financeForm.get(key);
        if (control!.dirty || control!.touched) {
          canGoBack = false;
        }
      }
    });
    return canGoBack;
  }

  async goBack() {
    const financeId = parseInt(this.activatedRoute.snapshot.paramMap.get('financeId')!,10);
  
    if (!this.canGoBack()) {
      const financeData = this.financeForm.value;
  
      if (financeId) {
        const updatedFinance: Saving = {
          saving_id: financeId,
          name: financeData.name,
          description: financeData.description,
          start_date: financeData.start_date,
          amount: financeData.amount,
          end_date: financeData.end_date,
          type: financeData.type,
          user_id: this.user?.uid ?? null,
        };
        console.log(updatedFinance);
  
        if (this.savingService.updateSaving(financeId, updatedFinance)) {
          await this.utilities.presentToast(
            'bottom',
            'Ahorro actualizado correctamente'
          );
        } else {
          await this.utilities.presentToast(
            'bottom',
            'Se presentó un error al actualizar el ahorro'
          );
        }
      }
    }
    this.router.navigate(['/finance']);
  }

  sortTable(column: keyof FinanceDetail) {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.finance.sort((a, b) => {
      const aValue = a[column] ?? '';
      const bValue = b[column] ?? '';

      if (aValue < bValue) {
        return this.sortAscending ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortAscending ? 1 : -1;
      }
      return 0;
    });
  }

  searchFinance(searchTerm: string) {
    this.filteredFinance = this.finance.filter((finance) => {
      return Object.values(finance).some(value => {
        return (
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  openFinance(finance: FinanceDetail) {
    this.navCtrl.navigateForward(['/update-finance-detail', finance.finance_detail_id]);
  }

  addDetails(financeid: number) {
    this.navCtrl.navigateForward(['/add-finance-detail', financeid]);
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
        if (this.savingService.deleteSaving(financeId)) {
          console.log('Ahorro eliminado correctamente');
          this.router.navigate(['/finance']);
        } else {
          console.log('Se presentó un error al eliminar el ahorro');
        }
        break;
      case 'cancel':
        console.log('Cancelando la actualización del ahorro');
        this.router.navigate(['/finance']);
        break;
      default:
        console.log('Acción desconocida');
    }
  }
}
