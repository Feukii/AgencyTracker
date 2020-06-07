import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }



  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signinForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  onsubmit() {
    const  email = this.signinForm.get('email').value;
    const  password = this.signinForm.get('password').value;

    this.authService.signInUser(email, password).then(
        () => {
          this.router.navigate(['menu']);
        },
        // tslint:disable-next-line:no-shadowed-variable
        (error) => {
          this.errorMessage = error;
        }
    );
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



