import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private toastController: ToastController) { }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  formatExpirationDate(date: Date): string {
    date.setHours(23, 59, 59);
    const timezoneOffset = date.getTimezoneOffset() * 60000; // Obtener la diferencia de zona horaria en milisegundos
    const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString().slice(0, -1); // Ajustar la fecha en función de la zona horaria
    return localISOTime;
  } 

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }

  coverImage(): void {
    const randomIndex = Math.floor(Math.random() * 28) + 1; // genera un número aleatorio del 1 al 28
    const randomCover = `/assets/img/pexels-images/pexels_${randomIndex}.jpg`;
    const coverPhoto = document.querySelector('.cover-photo') as HTMLElement;
    coverPhoto.style.backgroundImage = `url(${randomCover})`;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: position
    });

    await toast.present();
  }
}
