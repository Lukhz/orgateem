import { DataService } from "../services/data.service";

export class Event {
  id: string;
  username: string;
  sportart: string;
  beschreibung: string;
  ort: string;
  startUhrzeit: string;
  endeUhrzeit: string;
  lat: number;
  lng: number;
  mitspieler: string[];

  setlat(lat:number,event:Event){
    event.lat = lat;
    var dataService : DataService
    dataService.updateEvent(event)
  }
}
