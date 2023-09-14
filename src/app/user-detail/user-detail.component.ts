import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, onSnapshot, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  firestore: Firestore = inject(Firestore);
  user: User = new User();
  docRef:any;
  docSnap:any;
  id:any;


  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
    this.getUser(this.id) 
  }


  async getUser(id:string) {
    this.docRef = doc(this.firestore, 'users', id);
    this.docSnap = await getDoc(this.docRef)
    this.user= new User(this.docSnap.data());
    console.log(this.user)
  }

}
