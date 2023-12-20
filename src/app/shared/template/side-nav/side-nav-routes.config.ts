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

  {
    path: 'notifications',
    title: 'Notifications',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'bell',
    submenu: [],
  },
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
        path: 'setting/documents',
        title: 'Documents',
        iconType: 'nzIcon',
        icon: 'file-done',
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

  {
    path: 'company',
    title: 'Companies',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'shop',
    submenu: [],
  },
];
