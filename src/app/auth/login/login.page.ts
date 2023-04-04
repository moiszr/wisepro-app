import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userEmail!: string;
  userPassword!: string;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  logIn(email: string, password: string) {
    this.authService
      .SignIn(email, password)
      .then((res) => {
        if (res) {
          this.router.navigate(['home']);
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === 'email-not-verified') {
            window.alert('Please verify your email address before signing in.');
          } else {
            window.alert('Please check the email or password and try again.');
          }
        } else {
          window.alert('An unexpected error occurred. Please try again.');
        }
      });
  }
}
