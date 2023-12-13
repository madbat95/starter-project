import { SideNavInterface } from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: [],
  },

  // {
  //   path: '/admin/report',
  //   title: 'Report',
  //   iconType: 'nzIcon',
  //   iconTheme: 'outline',
  //   icon: 'diff',
  //   submenu: [],
  // },

  {
    path: 'setting',
    title: 'Personal Settings',
    iconType: 'nzIcon',
    icon: 'setting',
    iconTheme: '',
    submenu: [
      {
        path: 'setting/profile',
        title: 'Profile',
        iconType: 'nzIcon',
        icon: 'user',
        iconTheme: 'outline',
        submenu: [],
      },
      {
        path: 'setting/change-password',
        title: 'Settings',
        iconType: 'nzIcon',
        icon: 'setting',
        iconTheme: 'outline',
        submenu: [],
      },
    ],
  },
];
