import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { AgenciesDataService } from '../services/agencies-data.service';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import * as L from 'leaflet';
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private agenciesDataService: AgenciesDataService,
    private firestore: AngularFirestore
  ) {}

  clickmethod() {
    this.isfiltered = true;
  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    this.getAgencies();
  }

  onSignOut() {
    this.authService.signOutUser();
  }
  ionViewDidEnter() {
    this.firestore
      .collection('agencies')
      .snapshotChanges()
      .subscribe((querySnapshot) => {
        this.agencies = querySnapshot;
        this.leafletMap();
      });
  }

  getAgencies() {
    this.agenciesDataService.getAgency().subscribe((res) => (res) => {
      console.log(res);
      this.agencies = res;
    });
  }

  leafletMap() {
    const iconRetinaUrl = 'assets/icon/marker-icon-2x.png';
    const iconUrl = 'assets/icon/marker-icon.png';
    const shadowUrl = 'assets/icon/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map = new Map('mapId').setView(
      [4.22055, 9.71235],
      14
    );
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
          ' <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZmV1a2lpIiwiYSI6ImNrOXdvY2MxazAwN3Izb3JvcnUzcjRmYmgifQ.zvLVpJsn90EJ5n2PWbUWJQ'
    }).addTo(this.map);
    console.log(this.agencies);
    this.markermap();
  }
  markermap() {
    for (const agency of this.agencies) {
      marker([
        agency.payload.doc.data().latitude,
        agency.payload.doc.data().longitude,
      ])
        .addTo(this.map)
        .bindPopup( agency.payload.doc.data().agencyName + ' ' + agency.payload.doc.data().town + ' ' + agency.payload.doc.data().district).openPopup();
    }
  }
  ViewMap() {
    this.router.navigate(['closest-agencies']);
  }
  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
  movetosignin() {
    this.router.navigate(['/auth/signin']);
  }
  UseConditions() {
    this.router.navigate(['term-of-use']);
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
  home() {
    this.router.navigate(['menu']);
  }
}
