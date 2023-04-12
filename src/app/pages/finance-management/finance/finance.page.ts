import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.navCtrl.navigateRoot(route, { animated: false });
  }

}
