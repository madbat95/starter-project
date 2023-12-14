import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
})
export class CompanyTableComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  data = [
    {
      memberName: 'John Malkovich',
      beneficialOwner: 'Yes',
      roles: 'Account Manager, Account Supervisor, Billing',
      actions: 'Action',
    },
  ];

  addCompany() {
    this.router.navigate(['companydetails'], {
      relativeTo: this.route,
      queryParams: { tab: 'companyinfo' },
    });
  }
}
