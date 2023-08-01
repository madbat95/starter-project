import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileSettingComponent,
    data: {
      title: 'Profile',
      headerDisplay: 'none',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
