import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: User = new User();
   item;
   item$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  allUsers:any =[];

  constructor(public dialog: MatDialog) {

        const itemCollection = collection(this.firestore, 'users');
        this.item$ = collectionData(itemCollection ,{ idField: 'id'});
        this.item = this.item$.subscribe((changes) => {
            console.log('New user',changes);
            this.allUsers = changes
        })
      }

      openDialog(){
      this.dialog.open(DialogAddUserComponent);
    }
  }
