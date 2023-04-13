// saving.interface.ts
export interface Saving {
    saving_id: number;
    name: string | null;
    description: string | null;
    start_date: Date | null;
    amount: string | null;
    end_date: Date | null;
    type: string | null;
    user_id: string | null;
  }