import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';
import { MatDialogRef } from '@angular/material/dialog';
//import {MatDialogModule} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthdate: Date | undefined;
  loading: boolean = false;
  item$: Observable<any[]>
  firestore: Firestore = inject(Firestore);
  //items;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
     const itemCollection = collection(this.firestore, 'users');
     this.item$ = collectionData(itemCollection);
    //  this.items = this.item$.subscribe((list) => {
    //    list.forEach(element => {
    //      console.log(element)
    //    });
    //  })
    
  }

  
  async saveUser() {
    this.user.birthDate = this.birthdate?.getTime();
    console.log('user', this.user); 
    this.loading = true;
    await addDoc(collection(this.firestore, 'users'), this.user.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then((result: any) => {
        console.log('Adding user finished', result);
        this.dialogRef.close();
      });
      this.loading = false;
  }


  getUsersRef(){
    return collection(this.firestore, 'users');
  }

  getSingelRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId)
  }
}
