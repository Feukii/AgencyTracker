import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgenciesDataService } from '../services/agencies-data.service';
import {AgencyModel } from '../models/agency.model';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { Map, tileLayer, marker } from 'leaflet';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-agencies-list',
  templateUrl: './agencies-list.component.html',
  styleUrls: ['./agencies-list.component.scss'],
})
export class AgenciesListComponent implements OnInit {
// agencies: AgencyModel[];
// agenciesSubscription: Subscription;
  agencies;
  map: Map;

  constructor( private agenciesDataService: AgenciesDataService,
               private router: Router,
               private firestore: AngularFirestore) { }


  ngOnInit() {
   this.getAgencies();
  }
  getAgencies = () =>
      this.agenciesDataService
          .getAgency()
          .subscribe(res => (this.agencies = res))
  deleteAgency = data => this.agenciesDataService.deleteAgncy(data);

  markCompleted = data => this.agenciesDataService.updateAgency(data);
  onNewAgency() {
    this.router.navigate(['/agencies', 'new']);
    console.log(this.agencies);
  }
  ViewMap() {
    this.router.navigate(['menu']);
  }
  home() {
    this.router.navigate(['menu']);
  }
  movetosignin() {
    this.router.navigate(['/auth/signin']);
  }
  UseConditions() {
    this.router.navigate(['conditions']);
  }
  services() {
    this.router.navigate(['services']);
  }
  agencylists() {
    this.router.navigate(['agencies']);
  }
  contactus() {
    this.router.navigate(['contact']);
  }
  closeagencies() {
    this.router.navigate(['closest-agencies']);
  }
}
