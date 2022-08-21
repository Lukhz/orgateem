import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  profile = null;

  constructor(private authServices: AuthService, private routi: Router) {}

  async logout() {
    await this.authServices.logout();
    this.routi.navigateByUrl('/login', { replaceUrl: true });
  }
}
