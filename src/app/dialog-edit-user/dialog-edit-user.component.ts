import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collectionData, collection, onSnapshot, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  loading: boolean = false;
  birthdate: Date | undefined;
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  docRef: any;
  docSnap: any;
  id: any;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }


  async saveUser() {
    this.loading = true;
    this.docRef = doc(this.firestore, 'users', this.id);
    await updateDoc(this.docRef, this.user.toJSON())
    .then((user:any)=>{
      console.log('was bist du?', user)
     // this.user = user
      this.loading = false;
      this.dialogRef.close();
    });
    
  }
}
