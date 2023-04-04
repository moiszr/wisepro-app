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
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        throw new Error('email-not-verified');
      }

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Registrar usuario con correo electrónico y contraseña
  async SignUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.SendVerificationMail(userCredential.user);
      this.SetUserData(userCredential.user);
      return userCredential;
    } catch (e) {
      return null;
    }
  }

  // Enviar correo electrónico de verificación al registrar un nuevo usuario
  async SendVerificationMail(user: FirebaseUser | null) {
    try {
      if (user) {
        await sendEmailVerification(user);
        console.log('Verification email sent');
      } else {
        console.warn('There is no currently authenticated user');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
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
    const user = this.auth.currentUser;
    return user !== null && user.emailVerified;
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
  async SetUserData(user: any, displayName?: string, photoURL?: string) {
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName,
        photoURL: photoURL || user.photoURL,
        emailVerified: user.emailVerified,
      };

      await setDoc(doc(this.firestore, 'users', user.uid), userData);
      console.log('User data stored in Firestore');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  // Cerrar sesión del usuario y eliminar datos del almacenamiento local
  SignOut() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
