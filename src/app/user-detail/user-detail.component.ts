import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, onSnapshot, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  firestore: Firestore = inject(Firestore);
  user: User = new User();
  docRef: any;
  docSnap: any;
  id: any;
  items$;
  items;


  constructor(route: ActivatedRoute, public dialog: MatDialog, public sharedService: SharedService) {
    this.id = route.snapshot.params['id'];
    this.getUser(this.id)
    this.user = this.sharedService.user;
    this.items$ = collectionData(collection(this.firestore, 'users'))
    this.items =this.items$.subscribe(()=>{
      this.getUser(this.id)
    })
  }


  async getUser(id:string) {
  //  await this.sharedService.getUser(id);
   
    this.docRef = doc(this.firestore, 'users', id);
    this.docSnap = await getDoc(this.docRef);
    this.user = new User(this.docSnap.data());
    console.log(this.user)
    
  }

  


  editUserDetail() {
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.id = this.id;
  }


  editMenu() {
    let dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON())
    dialog.componentInstance.id = this.id;
  
  }

}
