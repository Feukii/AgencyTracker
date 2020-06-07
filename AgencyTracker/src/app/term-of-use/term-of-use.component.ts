import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-term-of-use',
  templateUrl: './term-of-use.component.html',
  styleUrls: ['./term-of-use.component.scss'],
})
export class TermOfUseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
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

}
