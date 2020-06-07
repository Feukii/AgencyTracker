import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  constructor( private router: Router) { }
  home() {
    this.router.navigate(['menu']);
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
  ngOnInit() {}

}
