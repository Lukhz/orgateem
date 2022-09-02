import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private fireStoreC: Firestore) {}

  getEvents(): Observable<Event[]> {
    const eventsCollection = collection(this.fireStoreC, 'events');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(eventsCollection, { idField: 'id' }).pipe(
      map((events) => events as Event[])
    );
  }

  getEventById(id: string): Observable<Event> {
    const document = doc(this.fireStoreC, `events/${id}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Event;
      })
    );
  }

  createEvent(eventP: Event): Promise<void> {
    const document = doc(collection(this.fireStoreC, 'events'));
    return setDoc(document, eventP);
  }

  updateEvent(eventP: Event): Promise<void> {
    const document = doc(this.fireStoreC, 'events', eventP?.id);
    const { id, ...data } = eventP; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteEvent(id: string): Promise<void> {
    const document = doc(this.fireStoreC, 'events', id);
    return deleteDoc(document);
  }
}
