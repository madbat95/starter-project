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
];
