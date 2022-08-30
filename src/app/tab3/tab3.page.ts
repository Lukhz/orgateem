import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  constructor() {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      // forceCreate: true,
      config: {
        center: {
          lat: 52.283333,
          lng: 8.050000,
        },
        zoom: 8,
      },
    });
    console.log(this.map);
  }
}
