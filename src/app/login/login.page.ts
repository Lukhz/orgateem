import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private formBuilderr: FormBuilder,
    private loadingControllerr: LoadingController,
    private alertController: AlertController,
    private authServices: AuthService,
    private router: Router //navigate user after login
  ) {}

  //easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    //helps to display error in HTML
    this.credentials = this.formBuilderr.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async register() {
    const loading = await this.loadingControllerr.create();
    await loading.present();

    const user = await this.authServices.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      //replaceUrl, in case we move from loginpage to insidepage
      //this resets the page
      this.router.navigateByUrl('../tabs1', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  async login() {
    const loading = await this.loadingControllerr.create();
    await loading.present();

    const user = await this.authServices.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      //replaceUrl, in case we move from loginpage to insidepage
      //this resets the page
      this.router.navigateByUrl('../tabs1', { replaceUrl: true });
    } else {
      this.showAlert('Login unsuccessful', 'Please try again!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
