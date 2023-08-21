import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import {
  registerLocaleData,
  PathLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { httpInterceptorProvider } from './shared/interceptor/app.interceptor';
import { jwtInterceptorProvider } from './shared/interceptor/jwt.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SummernoteComponent } from './seo-editor/components/summernote/summernote.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, CommonLayoutComponent],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: [environment.apiUrl], // replace with your domain
        disallowedRoutes: [environment.apiUrl + '/auth/login'], // replace with your login endpoint
      },
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzBreadCrumbModule,
    TemplateModule,
    SharedModule,
    NzMessageModule,
  ],
  providers: [
    SummernoteComponent,
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    ThemeConstantService,
    httpInterceptorProvider,
    jwtInterceptorProvider,
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
