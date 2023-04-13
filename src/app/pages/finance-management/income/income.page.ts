import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Finance } from 'src/app/services/finance';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  searchVisible = false;
  sortColumn: keyof Finance = 'date';
  sortAscending = true;
  finance: Finance[] = [];
  filteredFinance: Finance[] = [];
  searchTerm = '';

  constructor(
    private navCtrl: NavController,
    private financeService: FinanceService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.finance = this.financeService.getIncomes();
    this.filteredFinance = this.finance;
    this.sortTable('date'); 
    console.log(this.finance);
  }

  sortTable(column: keyof Finance) {
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

  openFinance(finance: Finance) {
    this.navCtrl.navigateForward(['/update-income', finance.finance_id]);
  }

}
