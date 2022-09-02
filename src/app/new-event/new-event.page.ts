import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { Event } from '../model/event';
import { DataService } from '../services/data.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {
  createEventForm: FormGroup;
  @ViewChild('createForm') createForm: FormGroupDirective;

  //for datepicker
  modes = ['date', 'date-time', 'month', 'month-year'];
  selectedMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  dateValueEnd = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  formattedString = '';
  formattedStringEnd = '';

  constructor(
    private modalController: ModalController,
    private dataService: DataService
  ) {
    //rufe setDate
    this.setToday();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit(): void {
    this.createEventForm = new FormGroup({
      sportart: new FormControl('', Validators.required),
      ort: new FormControl('', Validators.required),
      beschreibung: new FormControl('', Validators.required),
      startUhrzeit: new FormControl('', Validators.maxLength(8)),
      endeUhrzeit: new FormControl('', Validators.maxLength(8)),
    });
  }

  submitForm() {
    this.createForm.onSubmit(undefined);
  }

  createEvent(values: any) {
    // copy all the form values into the new contact
    let newEvent: Event = { ...values };
    this.dataService.createEvent(newEvent);
    this.dismissModal();
  }

  //set the date
  setToday() {
    this.formattedString = format(
      parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'),
      'HH:mm, MMM d, yyyy'
    );
    this.formattedStringEnd = format(
      parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'),
      'HH:mm, MMM d, yyyy'
    );
  }

  dateChanged(value) {
    this.dateValue = value;
    this.formattedString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    this.createEventForm.value.startUhrzeit = this.formattedString;
  }

  dateChangedEnd(value) {
    this.dateValueEnd = value;
    this.formattedStringEnd = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    this.createEventForm.value.endeUhrzeit = this.formattedStringEnd;
  }
}
