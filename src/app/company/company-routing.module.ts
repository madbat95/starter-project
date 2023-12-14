import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyTableComponent } from './components/company-table/company-table.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { MembersComponent } from './components/members/members.component';
import { InvitesComponent } from './components/invites/invites.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyTableComponent,
    data: {
      headerDisplay: 'Company',
    },
  },

  {
    path: ':companydetails',
    component: CompanyDetailsComponent,
  },

  {
    path: ':members',
    component: MembersComponent,
  },

  {
    path: ':invites',
    component: InvitesComponent,
  },

  {
    path: ':companyinfo',
    component: CompanyInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
