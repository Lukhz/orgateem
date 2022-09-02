import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Event } from '../model/event';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page {
  public events: Observable<Event[]>;
  
  constructor(private dataService: DataService) {
    this.events = this.dataService.getEvents();
  }
 
}

