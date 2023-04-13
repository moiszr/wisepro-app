import { Injectable } from '@angular/core';
import { Saving } from './savings';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  private saving: Saving[] = [];

  constructor() {}

  getAllSavings(): Saving[] {
    return this.saving;
  }

  getSavingById(saving_id: number): Saving | undefined {
    return this.saving.find((saving) => saving.saving_id === saving_id);
  }

  addSaving(saving: Saving): void {
    saving.saving_id = this.getSavingId() + 1;
    this.saving.push(saving);
  }

  updateSaving(saving_id: number, updatedSaving: Saving): boolean {
    const index = this.saving.findIndex((saving) => saving.saving_id === saving_id);

    if (index !== -1) {
      this.saving[index] = updatedSaving;
      return true;
    }

    return false;
  }

  deleteSaving(saving_id: number): boolean {
    const index = this.saving.findIndex((saving) => saving.saving_id === saving_id);

    if (index !== -1) {
      this.saving.splice(index, 1);
      return true;
    }

    return false;
  }

  getSavingId(): number {
    const saving = this.saving;
    return saving.length > 0 ? saving[saving.length - 1].saving_id : 0;
  }
}
