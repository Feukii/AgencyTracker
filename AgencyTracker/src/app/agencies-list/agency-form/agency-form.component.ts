import { Component, OnInit } from '@angular/core';
import { AgenciesDataService } from '../../services/agencies-data.service';
import { AgencyModel } from '../../models/agency.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
})
export class AgencyFormComponent implements OnInit {
  agency = [];
  constructor(private formBuilder: FormBuilder,
              private agenciesDataService: AgenciesDataService,
              private router: Router) { }

  ngOnInit() {
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
    onSubmit() {
    this.agenciesDataService.form.value.agency  = this.agency;
    const data = this.agenciesDataService.form.value;
    this.agenciesDataService.createAgency(data).then(res => {
      console.log('send ok!!!!');
    });
    this.router.navigate(['/agencies']);
      }

}
