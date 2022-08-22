import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Photo } from '@capacitor/camera';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestoreC: Firestore,
    private storageC: Storage
  ) {}

  getUserProfile() {
    const user = this.auth.currentUser; // already contains the email
    //inject firestoreConstructor, path to the file
    const userDocRef = doc(this.firestoreC, `users/${user.uid}`);
    return docData(userDocRef);
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const pfad = `uploads/${user.uid}/profile.png`;
    //create a reference to that path
    const storageRef = ref(this.storageC, pfad);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imgUrl = await getDownloadURL(storageRef); // give us the plain imageURL to the file within FirebaseStorage

      const userDocRef = doc(this.firestoreC, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imgUrl,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
