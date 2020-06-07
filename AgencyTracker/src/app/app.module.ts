import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SignupComponent} from './auth/signup/signup.component';
import { SigninComponent} from './auth/signin/signin.component';
import { AuthService} from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import {MenuComponent} from './menu/menu.component';
import {HttpClientModule} from '@angular/common/http';
import {AgenciesListComponent} from './agencies-list/agencies-list.component';
import {AgencyFormComponent} from './agencies-list/agency-form/agency-form.component';
import {SingleAgencyComponent} from './agencies-list/single-agency/single-agency.component';
import {CloseAgenciesComponent } from './close-agencies/close-agencies.component';
import {OurServicesComponent} from './our-services/our-services.component';
import {ContactComponent} from './contact/contact.component';
import {TermOfUseComponent } from './term-of-use/term-of-use.component';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'menu', component: MenuComponent },
  {path: 'agencies/new', component: AgencyFormComponent},
  {path: 'agencies/view/:id', component: SingleAgencyComponent},
  { path: 'agencies', component: AgenciesListComponent},
  {path: 'closest-agencies', component: CloseAgenciesComponent },
    {path: 'conditions', component: TermOfUseComponent },
    {path: 'contact', component: ContactComponent},
    {path: 'services', component: OurServicesComponent},
    { path: '', redirectTo: 'agencies', pathMatch: 'full' },
  { path: '**', redirectTo: 'agencies' }
];

@NgModule({
  declarations: [AppComponent,
                 SigninComponent,
                  MenuComponent,
                  SingleAgencyComponent,
                  AgencyFormComponent,
                  AgenciesListComponent,
                  CloseAgenciesComponent,
                  OurServicesComponent,
                  ContactComponent,
                  TermOfUseComponent,
                  SignupComponent], entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule, FormsModule,
        ReactiveFormsModule, HttpClientModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterModule.forRoot(appRoutes)],
  providers: [
      AuthService,
      AuthGuardService,
    StatusBar,
    SplashScreen,
      Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
