import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.navCtrl.navigateRoot(route, { animated: false });
  }

}
