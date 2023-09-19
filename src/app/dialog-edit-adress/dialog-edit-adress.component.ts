import { Component, inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {
id:any;
loading: boolean = false;
birthdate: Date | undefined;
firestore: Firestore = inject(Firestore);
user: User = new User();
docRef: any;
docSnap: any;


constructor(public dialogRef: MatDialogRef<DialogEditAdressComponent>) {}

async saveUser(){
  this.loading = true;
  this.docRef = doc(this.firestore, 'users', this.id);
  await updateDoc(this.docRef, this.user.toJSON())
  .then(()=>{
    this.loading = false;
    this.dialogRef.close();
  });
}

}
