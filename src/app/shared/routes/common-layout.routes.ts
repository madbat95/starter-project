import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
  //Dashboard
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'setting',
    loadChildren: () =>
      import('../../setting/setting.module').then((m) => m.SettingModule),
  },

  {
    path: 'notifications',
    loadChildren: () =>
      import('../../notifications/notifications.module').then(
        (m) => m.NotificationsModule
      ),
  },

  {
    path: 'company',

    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../company/company.module').then((m) => m.CompanyModule),
      },
    ],
  },
];
