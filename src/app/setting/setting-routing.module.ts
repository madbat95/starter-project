import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { IdentificationComponent } from './components/identification/identification.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileSettingComponent,
    data: {
      title: 'Profile',
      headerDisplay: 'none',
    },
  },
  {
    path: 'documents',
    component: IdentificationComponent,
    data: {
      title: 'Identification Documents',
      headerDisplay: 'none',
    },
  },
  {
    path: 'change-password',
    component: SetPasswordComponent,
    data: {
      title: 'Change-Password',
      headerDisplay: 'none',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
