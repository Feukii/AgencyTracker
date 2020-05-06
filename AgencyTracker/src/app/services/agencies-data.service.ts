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
    /*
  emitAgencies() {
    this.agenciesSubject.next(this.agencies);
  }
 saveAgencies() {
    firebase.database().ref('/agencies').push(this.agencies);
 }
 getAgencies() {
      firebase.database().ref('/books')
          .on('value', (data: DataSnapshot) => {
              this.agencies = data.val() ? data.val() : [];
              this.emitAgencies();
          });
 }
 getSingleAgency(id: number) {
      return new Promise(
          (resolve, reject) => {
              firebase.database().ref('/agencies/' + id).once('value').then(
                  (data: DataSnapshot) => {
                      resolve(data.val());
                  }, (error) => {
                      reject(error);
                  }
              );
              }
          );
 }
 createNewAgency(newAgency: AgencyModel) {
      this.agencies.push(newAgency);
      this.saveAgencies();
      this.emitAgencies();
 }

 removeAgency(agency: AgencyModel) {
      const agencyIndexToRemove = this.agencies.findIndex(
          (agencyEl) => {
              if (agencyEl === agency) {
                  return true;
              }
          }
      );
      this.agencies.splice(agencyIndexToRemove, 1);
      this.saveAgencies();
      this.emitAgencies();
 }

     */
}
