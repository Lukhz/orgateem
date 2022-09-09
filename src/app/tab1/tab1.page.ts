import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ENGINE_METHOD_CIPHERS } from 'constants';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { NewEventPage } from '../new-event/new-event.page';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public events: Observable<Event[]>;
  public yourEvents = new Array<Event>;
  
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    public modalContraller: ModalController,
    private routerOutletC: IonRouterOutlet,
    private router: Router
  ) {
    this.events = this.dataService.getEvents();
    this.getYourEvents();
  }

  getYourEvents(){
    var uid = this.authService.getUser().uid;
    this.events.subscribe((value: Event[]) => {
   
      this.yourEvents = value.filter(x => x.mitspieler.find(y=>y === uid)) 
      console.log(this.yourEvents)
      
    })
  }

  async openNewEventModal() {
    const modal = await this.modalContraller.create({
      component: NewEventPage,
      swipeToClose: true,
      presentingElement: this.routerOutletC.nativeEl,
    });

    return await modal.present();
  }

  navigate() {
    this.router.navigate(['../event-details']);
  }
}
