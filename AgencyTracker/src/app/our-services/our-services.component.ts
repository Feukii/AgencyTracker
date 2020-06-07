import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AgenciesDataService} from "../services/agencies-data.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private agenciesDataService: AgenciesDataService,
              private firestore: AngularFirestore) { }
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
  ngOnInit() {}

}
