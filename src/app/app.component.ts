import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Dashboard', url: '/home', icon: 'mail' },
    { title: 'Task', url: '/tasks', icon: 'grid' },
    { title: 'Time', url: '/time', icon: 'stopwatch' },
    { title: 'Notes', url: '/notes', icon: 'documents' },
    { title: 'Finance', url: '/finance', icon: 'cash' },
  ];

  menuType: string = 'overlay';

  constructor(
    private navCtrl: NavController
  ) {}
}
