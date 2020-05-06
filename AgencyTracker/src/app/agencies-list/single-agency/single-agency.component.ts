import { Component, OnInit } from '@angular/core';
import { AgencyModel } from '../../models/agency.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenciesDataService } from '../../services/agencies-data.service';

@Component({
  selector: 'app-single-agency',
  templateUrl: './single-agency.component.html',
  styleUrls: ['./single-agency.component.scss'],
})
export class SingleAgencyComponent {
// agency: AgencyModel;
  constructor(private route: ActivatedRoute,
              private agenciesDataService: AgenciesDataService,
              private router: Router) { }

 /* ngOnInit() {
    this.agency = new AgencyModel('', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.agenciesDataService.getSingleAgency(+id).then(
        (agency: AgencyModel) => {
          this.agency = agency;
        }
    );
  }
 onBack() {
    this.router.navigate(['/agencies']);
 }
 */
}
