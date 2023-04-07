import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.scss'],
})
export class InitialsAvatarComponent  implements OnInit {

  _fullName: string = '';
  initials: string = '';

  constructor() {}

  ngOnInit() {
    this.initials = this.getInitials(this._fullName);
  }

  @Input() set fullName(value: string) {
    this._fullName = value;
    this.initials = this.getInitials(this._fullName);
  }

  getInitials(name: string): string {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial = nameParts[1] ? nameParts[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  }
}