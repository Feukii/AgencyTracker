import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';
import {AgenciesDataService} from '../services/agencies-data.service';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isAuth: boolean;
  agencyData = [];
  filteredAgency = [];
  isfiltered: boolean;
  map: Map;
  agencies;

  constructor(private router: Router,
              private authService: AuthService,
              private agenciesDataService: AgenciesDataService,
              private firestore: AngularFirestore) {
  }
  getAgencyDetails(agency) {
    this.router.navigate(['/agency-details']);
  }
  movetosignin() {

    this.router.navigate(['/auth/signin']);
  }
  UseConditions() {
    this.router.navigate(['term-of-use']);
  }
  services() {
    this.router.navigate(['']);

  }
  agencylists() {
    this.router.navigate(['agencies']);

  }
  contactus() {
    this.router.navigate(['contact']);

  }
  closeagencies() {
    this.router.navigate(['']);

  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
          } else  {
            this.isAuth = false;
          }
        }
    );
    this.getAgencies();
  }

  onSignOut() {
    this.authService.signOutUser();
  }
  ionViewDidEnter() { this.leafletMap(); }

  getAgencies() {
    this.agenciesDataService
        .getAgency()
        .subscribe(res => (this.agencies = res));
  }

  leafletMap() {
    this.map = new Map('mapId').setView([3.8576127999999996, 11.513855999999999], 10);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
    console.log(this.agencies);
    this.markermap();
  }
     markermap() {
       console.log('a');
       for (const agency of this.agencies) {
         marker([agency.payload.doc.data().latitude, agency.payload.doc.data().longitude])
             .addTo(this.map).bindPopup(agency.payload.doc.data().town).openPopup();
       }
       console.log('b');
    }
  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
