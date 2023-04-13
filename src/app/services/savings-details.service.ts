import { Injectable } from '@angular/core';
import { FinanceDetail } from './savingsDetail';

@Injectable({
  providedIn: 'root',
})
export class SavingsDetailService {
  private finances: FinanceDetail[] = [];

  constructor() {}

  getAllFinances(financeId: number): FinanceDetail[] {
    const financeIdString = financeId.toString();
    return this.finances.filter((finance) => finance.finance_id === financeIdString);
  }  

  getFinanceById(finance_id: number): FinanceDetail | undefined {
    return this.finances.find(
      (finance) => finance.finance_detail_id === finance_id
    );
  }

  addFinance(finance: FinanceDetail): void {
    finance.finance_detail_id = this.getFinanceId() + 1;
    this.finances.push(finance);
  }

  updateFinance(finance_id: number, updatedFinance: FinanceDetail): boolean {
    const index = this.finances.findIndex(
      (finance) => finance.finance_detail_id === finance_id
    );

    if (index !== -1) {
      this.finances[index] = updatedFinance;
      return true;
    }

    return false;
  }

  deleteFinance(finance_id: number): boolean {
    const index = this.finances.findIndex(
      (finance) => finance.finance_detail_id === finance_id
    );

    if (index !== -1) {
      this.finances.splice(index, 1);
      return true;
    }

    return false;
  }

  getFinanceId(): number {
    const finance = this.finances;
    return finance.length > 0
      ? finance[finance.length - 1].finance_detail_id
      : 0;
  }
}
