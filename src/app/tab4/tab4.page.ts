import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  profile = null;

  constructor(
    private authServices: AuthService,
    private routi: Router,
    private avatarServiceC: AvatarService,
    private loadingControllerC: LoadingController,
    private alertController: AlertController
  ) {
    this.avatarServiceC.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async logout() {
    await this.authServices.logout();
    this.routi.navigateByUrl('/login', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingControllerC.create();
      await loading.present();

      const result = await this.avatarServiceC.uploadImage(image);
      loading.dismiss();

      if (!result) {
        //for testing
        const alert = await this.alertController.create({
          header: 'Upload gescheitert! :(',
          message: 'Es gab ein Problem beim Hochladen. Versuche es nochmals',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
