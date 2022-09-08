import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';
import { Event } from '../model/event';
import { Observable } from 'rxjs/internal/Observable';
import { google } from 'google-maps';
import { table } from 'console';
import { isThisSecond } from 'date-fns';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { title } from 'process';
import { timingSafeEqual } from 'crypto';
import { Tab3PageModule } from './tab3.module';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;
  
  public events: Observable<Event[]>;

  latitude = 52.3;
  longitude = 8.2;
  name = 'test';
  beschreibung = 'Default'
  result:google.maps.GeocoderGeometry;
  status;

  constructor(
    private modalController: ModalController, 
    private dataService: DataService
    ) {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: 'AIzaSyCsoY6-iLzUlPQCXGRmJmk-5OIHXcAI9yE',
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

    //Events aus der Datenbank lesen und als Marker adden
    this.events = this.dataService.getEvents();

   this.events.subscribe((value: Event[]) => {
      for(var i=0; i < value.length; i++){
        //console.log(`Event: ${value[i].ort}`)  

        //ToDo: Ort in Long und lati umwandeln
        /*var geocoder = new google.maps.Geocoder()
        geocoder.geocode({ 'address': value[i].ort}, function(results, status) => {
          if (status === 'OK'){
            console.log(results[0].geometry.location.lat() +' / '+results[0].geometry.location.lng())
          }else{
            console.log(status);
          }
        })*/
        //console.log('result: '+ this.result[0].geometry.location.lat() +' / '+this.result[0].geometry.location.lng())
        //console.log(this.result.location.lat());
        this.addMarkers(value[i].lat, value[i].lng, value[i].sportart, value[i].beschreibung)
      }  
    })
    //console.log(this.map);
    this.addMarkers(this.latitude, this.longitude, this.name, this.beschreibung);
  }

  async addMarkers(latitude,longitude, name, beschreibung) {
    const markersArray: Marker[] = [
      {
        coordinate: {
          lat: latitude,
          lng: longitude,
        },
        title: name,
        snippet: beschreibung,
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
