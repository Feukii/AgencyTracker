import { Injectable } from '@angular/core';
import { AgencyModel} from '../models/agency.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { AngularFirestore} from '@angular/fire/firestore';
import { FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AgenciesDataService {

  agencies: AgencyModel[] = [];
  agenciesSubject = new Subject<AgencyModel[]>();
 // agency: AgencyModel;
  constructor(private firestore: AngularFirestore) {
  }
  form = new FormGroup({
      agencyName: new FormControl(''),
      town: new FormControl(''),
      district: new FormControl(''),
      longitude: new FormControl(''),
      latitude: new FormControl(''),
      completed: new FormControl(false)
  });
  createAgency(data) {
      return new Promise<any>((resolve, reject) => {
          this.firestore
              .collection('agencies')
              .add(data)
              .then(res => {}, err => reject(err));
      });
  }

  updateAgency(data) {
       this.firestore
               .collection('agencies')
               .doc(data.payload.doc.id)
               .set({completed: true}, {merge: true});

  }
  getAgency() {
      return this.firestore.collection('agencies').snapshotChanges();
  }
  deleteAgncy(data) {
      this.firestore
          .collection('agencies')
          .doc(data.payload.doc.id)
          .delete();
  }
}
