import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, onSnapshot, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  allUser: any[] = [];
  firestore: Firestore = inject(Firestore);
  unsubUser;
  unsubSingelUser: any;
  docRef: any;
  docSnap: any;
  id: any;
  user:User = new User;

  constructor() {
    this.unsubUser = this.subUser()

  }


  subSingelUser(userID: string) {
    return onSnapshot(this.getSingelUserRef('users', userID), (element) => {
      console.log('funktionierts?', this.setUserObject(element.data(), element.id));
      this.user = this.setUserObject(element.data(), element.id)
    })
  }


  async getUser(id: string) {


    this.subSingelUser(id)
  }


  subUser() {
    return onSnapshot(this.getUserRef(), (obj) => {
      this.allUser = [];
      obj.forEach(element => {
        this.allUser.push(this.setUserObject(element.data(), element.id));

      });
    })
  }


  async updateUser(user: User) {
    if (user.id) {
      await updateDoc(this.getSingelUserRef('users', user.id), user.toJSON());
      this.subUser();
      this.unsubSingelUser = this.subSingelUser(user.id)
    }
  }


  ngonDestroy() {
    this.unsubSingelUser();
    this.unsubUser();
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }


  getSingelUserRef(colid: string, docId: string) {
    return doc(collection(this.firestore, colid), docId)
  }

  setUserObject(obj: any, id: string): any {
    return {
      id: id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthday || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    }

  }
}
