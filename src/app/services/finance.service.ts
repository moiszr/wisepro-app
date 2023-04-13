import { Injectable } from '@angular/core';
import { Finance } from './finance';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private finances: Finance[] = [];

  constructor() {}

  getAllFinances(): Finance[] {
    return this.finances;
  }

  getIncomes(): Finance[] {
    return this.finances.filter((finance) => finance.type === 'Income');
  }
  
  getExpenses(): Finance[] {
    return this.finances.filter((finance) => finance.type === 'Expenses');
  }

  getFinanceById(finance_id: number): Finance | undefined {
    return this.finances.find((finance) => finance.finance_id === finance_id);
  }

  addFinance(finance: Finance): void {
    finance.finance_id = this.getFinanceId() + 1;
    this.finances.push(finance);
  }

  updateFinance(finance_id: number, updatedFinance: Finance): boolean {
    const index = this.finances.findIndex((finance) => finance.finance_id === finance_id);

    if (index !== -1) {
      this.finances[index] = updatedFinance;
      return true;
    }

    return false;
  }

  deleteFinance(finance_id: number): boolean {
    const index = this.finances.findIndex((finance) => finance.finance_id === finance_id);

    if (index !== -1) {
      this.finances.splice(index, 1);
      return true;
    }

    return false;
  }

  getFinanceId(): number {
    const finance = this.finances;
    return finance.length > 0 ? finance[finance.length - 1].finance_id : 0;
  }
}
