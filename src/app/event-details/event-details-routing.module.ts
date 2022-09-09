import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab1PageRoutingModule } from "../tab1/tab1-routing.module";

import { EventDetailsPage } from './event-details.page';

const routes: Routes = [
  {
    path: '',
    component: EventDetailsPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDetailsPageRoutingModule {}
