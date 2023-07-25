import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";
import { AppGuard } from './shared/guards/app.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { EditProfileComponent } from './auth/components/edit-profile/edit-profile.component';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [AppGuard],
      },

      {
        path: '',
        loadChildren: () =>
          import('./front/front.module').then(
            (m) => m.FrontModule
          ),
        canActivate: [AuthGuard],
      },
    
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
    
      {
        path: 'admin',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        component: CommonLayoutComponent,
        children: CommonLayout_ROUTES,
        canActivate: [AuthGuard],
      },
    
      {
        path: '**',
        redirectTo: '',
      },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { 
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled' 
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}