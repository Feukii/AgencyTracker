import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AgenciesDataService} from '../services/agencies-data.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
    selector: 'app-close-agencies',
    templateUrl: './close-agencies.component.html',
    styleUrls: ['./close-agencies.component.scss'],
})
export class CloseAgenciesComponent implements OnInit {
    map: Map;
    latitude: any; // latitude
    longitude: any; // longitude
    agencies;
    allAgencies: any [] = [];
    markerAgency;
    markerPoint;
    from;
    allDistances: any [] = [];
    spliceDistances: any [] = [];
    distance: any [] = [];
    constructor(private geolocation: Geolocation,
                private agenciesDataService: AgenciesDataService,
                private firestore: AngularFirestore
    ) { }
    options = {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 3600
    };
    ionViewDidEnter() {
        this.firestore
            .collection('agencies')
            .snapshotChanges()
            .subscribe((querySnapshot) => {
                this.agencies = querySnapshot;
                this.leafletMap();
            });
    }

    getCurrentCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            console.log(this.latitude, this.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }


    ngOnInit() {
        this.getCurrentCoordinates();
        this.getAgencies();
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
        this.map = new Map('map').setView(
            [4.05055, 9.70235],
            18
        );
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZmV1a2lpIiwiYSI6ImNrOXdvY2MxazAwN3Izb3JvcnUzcjRmYmgifQ.zvLVpJsn90EJ5n2PWbUWJQ'
        }).addTo(this.map);
        // this.filltab();
        this.createMarker();
        // this.markermap();


    }
    createMarker() {
        const markerCurrent = marker([this.latitude, this.longitude]);
        const position = markerCurrent.getLatLng();
        markerCurrent.bindPopup('Here is your current position');
        const container = document.getElementById('distance');
        for (const agency of this.agencies) {
            this.allAgencies.push(agency.payload.doc.data());
        }
        console.log(this.allAgencies);
        for ( let i = 0; i <= this.allAgencies.length; i++) {
            if (typeof this.allAgencies[i] === 'object') {
                // console.log(this.allAgencies[i].latitude);
                this['markerAgency' + i] = L.circleMarker([this.allAgencies[i].latitude,
                    this.allAgencies[i].longitude], { color: '#F00', radius: 10 });
                this['from' + ' ' + this.allAgencies[i].agencyName + ' ' + this.allAgencies[i].district]
                    = this['markerAgency' +  i ].getLatLng();
                this.distance.push((position.
                distanceTo(this['from' + ' ' + this.allAgencies[i].agencyName + ' ' + this.allAgencies[i].district])).
                toFixed(0) / 1000);
                this.allDistances.push({
                    agencyname: this.allAgencies[i].agencyName,
                    district: this.allAgencies[i].district,
                    lat: this.allAgencies[i].latitude,
                    long: this.allAgencies[i].longitude,
                    distance: (position.
                    distanceTo(this['from' + ' ' + this.allAgencies[i].agencyName + ' ' + this.allAgencies[i].district])).
                    toFixed(0) / 1000
                });
            }
        }
        console.log(this.allDistances);
        console.log('a');
        this.distance.sort((a, b) => a - b);
        this.spliceDistances = this.distance.splice(0, 3);
        console.log(this.spliceDistances);
        for (let j = 0; j <= this.spliceDistances.length; j++) {
            for (let i = 0; i <= this.allDistances.length; i++) {
                if (typeof this.allDistances[i] === 'object') {
                    if (this.spliceDistances[j] === this.allDistances[i].distance) {
                        console.log('b');
                        console.log(this.allDistances[i]);
                        this['markerPoint' + j] = L.circleMarker([this.allDistances[i].lat,
                            this.allDistances[i].long], {color: '#F73E01', radius: 10});
                        console.log('c');
                        this['from' + ' ' + this.allDistances[i].agencyName + ' ' + this.allDistances[i].district]
                            = this['markerPoint' +  j ].getLatLng();
                        console.log('d');
                        this['markerPoint' + j]
                            .bindPopup(this.allDistances[i].agencyname + '' + this.allDistances[i].district + this.spliceDistances[j]);
                        console.log('e');
                        this.map.addLayer(this['markerPoint' + j]);
                        console.log('f');
                    }
                }
            }
        }
        this.map.addLayer(markerCurrent);
    }
    /*markermap() {
        for (const agency of this.agencies) {
            marker([
                agency.payload.doc.data().latitude,
                agency.payload.doc.data().longitude,
            ])
                .addTo(this.map)
                .bindPopup(agency.payload.doc.data().town)
                .openPopup();
        }
         }
     */
    ionViewWillLeave() {
        this.map.remove();
    }
}

