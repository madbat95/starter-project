import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
  //Dashboard
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'seo',
    loadChildren: () =>
      import('../../seo-editor/seo.module').then((m) => m.SeoModule),
  },
];
