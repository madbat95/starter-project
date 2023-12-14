import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyTableComponent } from './components/company-table/company-table.component';

const routes: Routes = [
  {
    path: 'companies',
    component: CompanyTableComponent,
    data: {
      title: 'Companies',
      headerDisplay: 'none',
    },
  },

  // {
  //   path: 'companyinfo',
  //   component: CompanyInfoComponent,
  //   data: {
  //     title: 'Information',
  //     headerDisplay: 'none',
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
