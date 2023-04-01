import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userEmail!: string;
  userPassword!: string;
  userDisplayName!: string;
  userPhotoURL!: string;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  signUp(
    email: string,
    password: string,
    displayName: string,
    photoURL: string,
  ) {
    this.authService
      .RegisterUser(email, password)
      .then((res) => {
        if (res && res.user) {
          // Set user data and send verification email
          this.authService.SetUserData({
            uid: res.user.uid,
            email: res.user.email,
            displayName: displayName,
            photoURL: photoURL = '',
            emailVerified: res.user.emailVerified,
          });
          this.authService.SendVerificationMail();
          this.router.navigate(['verify-email']);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
