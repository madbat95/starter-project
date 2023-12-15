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
      companyName: 'John Malkovich',
      companyType: '-',
      state: 'Texas',
      role: 'Account Manager, Account Supervisor, Billing',
      alert: 43,
    },
    {
      companyName: 'John Malkovich',
      companyType: '-',
      state: 'Texas',
      role: 'Account Manager, Account Supervisor, Billing',
      alert: 43,
    },
    {
      companyName: 'John Malkovich',
      companyType: '-',
      state: 'Texas',
      role: 'Account Manager, Account Supervisor, Billing',
      alert: 43,
    },
    {
      companyName: 'John Malkovich',
      companyType: '-',
      state: 'Texas',
      role: 'Account Manager, Account Supervisor, Billing',
      alert: 43,
    },
  ];

  addCompany() {
    this.router.navigate(['companydetails'], {
      relativeTo: this.route,
      queryParams: { tab: 'companyinfo' },
    });
  }
}
