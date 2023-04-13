import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Saving } from 'src/app/services/savings';
import { SavingService } from 'src/app/services/savings.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  searchVisible = false;
  sortColumn: keyof Saving = 'end_date';
  sortAscending = true;
  finance: Saving[] = [];
  filteredFinance: Saving[] = [];
  searchTerm = '';
  
  constructor(
    private navCtrl: NavController,
    private savingService: SavingService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.finance = this.savingService.getAllSavings();
    this.filteredFinance = this.finance;
    this.sortTable('end_date'); 
    console.log(this.finance);
  }

  sortTable(column: keyof Saving) {
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

  navigateTo(route: string) {
    this.navCtrl.navigateRoot(route, { animated: false });
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  openFinance(finance: Saving) {
    this.navCtrl.navigateForward(['/update-finance', finance.saving_id]);
  }

}
