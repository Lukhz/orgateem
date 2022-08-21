import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  profile = null;
  constructor(private authServices: AuthService, private routerR: Router) {}

  async logout() {
    await this.authServices.logout();
    this.routerR.navigateByUrl('/', { replaceUrl: true });
  }
}
