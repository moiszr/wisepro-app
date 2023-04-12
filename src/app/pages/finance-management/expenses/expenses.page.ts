import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.navCtrl.navigateRoot(route, { animated: false });
  }

}
