import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthBaseComponent } from './components/auth-base/auth-base.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ActivateComponent } from './components/activate/activate.component';
import { WaitingScreenComponent } from './components/waiting-screen/waiting-screen.component';

const routes: Routes = [
  {
    path: '',
    component: AuthBaseComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'recover',
        component: ForgotPasswordComponent,
      },
      {
        path: 'password-reset/:uid/:token',
        component: PasswordResetComponent,
      },
      {
        path: 'activate/:uid/:token',
        component: ActivateComponent,
      },

      { path: 'waiting', component: WaitingScreenComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
