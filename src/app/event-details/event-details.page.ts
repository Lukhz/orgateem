import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from '../model/event';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit, OnDestroy {
  public event: Event;

  sub1: Subscription;

  constructor(
    private dataService: DataService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private authServices: AuthService
  ) {}

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');

    this.sub1 = this.dataService.getEventById(id).subscribe((event) => {
      //if event doesnt exists, return to home page
      if (!event) {
        this.router.navigate(['../tab1']);
      } else {
        this.event = event;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  accept(event: Event){
    event.mitspieler.push(this.authServices.getUser().uid);
    this.dataService.updateEvent(event);
  }
  decline(event:Event){
    var uid = this.authServices.getUser().uid;

    event.mitspieler.forEach( (item, index) => {
      if(item === uid) console.log(item + ' / ' + index) ; event.mitspieler.splice(index,1);
    });
    this.dataService.updateEvent(event)
  }

}
