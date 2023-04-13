// FinanceDetail.interface.ts
export interface FinanceDetail {
    finance_detail_id: number;
    description: string | null;
    date: Date | null;
    amount: string | null;
    finance_id: string | null;
  }