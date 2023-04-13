// finance.interface.ts
export interface Finance {
    finance_id: number;
    name: string | null;
    description: string | null;
    type: string | null;
    amount: number | null;
    date: Date | null;
    type_expense: string | null;
    user_id: string | null;
  }