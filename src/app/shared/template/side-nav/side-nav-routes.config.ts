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
    path: '/admin/seo',
    title: 'SEO',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'rocket',
    submenu: [],
  },
  {
    path: '/admin/report',
    title: 'Report',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'diff',
    submenu: [],
  },
  {
    path: 'setting/profile',
    title: 'Profile',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    submenu: [],
  },
];
