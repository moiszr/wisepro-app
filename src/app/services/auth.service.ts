import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
  FacebookAuthProvider,
  GithubAuthProvider,
} from '@angular/fire/auth';
import { getFirestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  private auth = getAuth();
  private firestore = getFirestore();

  constructor(public router: Router, public ngZone: NgZone) {
    this.auth = getAuth();
    this.firestore = getFirestore();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // Iniciar sesión con correo electrónico y contraseña
  async SignIn(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      return null;
    }
  }

  // Registrar usuario con correo electrónico y contraseña
  async RegisterUser(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.SetUserData(userCredential.user);
      return userCredential;
    } catch (e) {
      return null;
    }
  }

  // Enviar correo electrónico de verificación al registrar un nuevo usuario
  async SendVerificationMail() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        await this.SignOut();
      } catch (error) {
        console.error('Error sending email verification:', error);
      }
    }
  }

  // Recuperar contraseña enviando un correo electrónico de restablecimiento de contraseña
  async PasswordRecover(passwordResetEmail: string) {
    try {
      await sendPasswordResetEmail(this.auth, passwordResetEmail);
      window.alert(
        'Password reset email has been sent, please check your inbox.'
      );
    } catch (error) {
      window.alert(error);
    }
  }

  // Devuelve verdadero si el usuario está conectado y su correo electrónico está verificado
  get isLoggedIn(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return false;
    }
    const user = JSON.parse(userStr);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Devuelve verdadero si el correo electrónico del usuario está verificado
  get isEmailVerified(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return false;
    }
    const user = JSON.parse(userStr);
    return user.emailVerified !== false ? true : false;
  }

  // Iniciar sesión con cuenta de Google
  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(), provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Iniciar sesión con cuenta de Facebook
  FacebookAuth() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(getAuth(), provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Iniciar sesión con cuenta de Github
  GithubAuth() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(getAuth(), provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Almacenar datos del usuario en Firestore
  SetUserData(user: any) {
    const userRef = doc(getFirestore(), `users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return setDoc(userRef, userData, {
      merge: true,
    });
  }

  // Cerrar sesión del usuario y eliminar datos del almacenamiento local
  SignOut() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
