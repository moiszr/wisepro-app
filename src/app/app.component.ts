import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages: MenuItem[] = [
    { title: 'Dashboard', url: '/home', icon: 'mail', relatedUrls: ['/home'] },
    { title: 'Task', url: '/tasks', icon: 'grid', relatedUrls: ['/tasks', '/tasks-card', '/tasks-list'] },
    { title: 'Notes', url: '/notes', icon: 'documents', relatedUrls: ['/notes'] },
    { title: 'Finance', url: '/finance', icon: 'cash', relatedUrls: ['/finance', '/expenses', '/income'] },
  ];

  menuType: string = 'overlay';
  currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  isSelected(p: MenuItem): boolean {
    return p.relatedUrls.includes(this.currentUrl);
  }
}

interface MenuItem {
  title: string;
  url: string;
  icon: string;
  relatedUrls: string[];
}
