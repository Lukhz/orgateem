import { Component, ElementRef, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { GoogleMap } from '@capacitor/google-maps';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  //@ViewChild('map') mapView: ElementRef;
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  constructor() {}
 
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: "AIzaSyAjOGgmZTAyT9mYOGo14b4W6rMOhXOl9n0",
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
 
 
  /*
  ionViewDidEnter(){
    this.createMap();
  }

  createMap(){
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    console.log("file:tab2.page.ts",boundingRect)

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      //latitude:
      //longitude:
      zoom: 3,
      //liteMode:
      })
    }*/

}

