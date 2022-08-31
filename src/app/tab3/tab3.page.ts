import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  constructor(private modalController: ModalController) {}

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
    //console.log(this.map);
    this.addMarkers();
  }

  async addMarkers() {
    const markersArray: Marker[] = [
      {
        coordinate: {
          lat: 52.3,
          lng: 8.2,
        },
        title: 'lits me',
        snippet: 'Bester ort zum Saufen',
      },
    ];

    await this.map.addMarkers(markersArray);

    this.map.setOnMarkerClickListener(async (marker) => {
      //console.log(marker);
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.4],
        initialBreakpoint: 0.3,
      });
      modal.present();
    });
  }
}
