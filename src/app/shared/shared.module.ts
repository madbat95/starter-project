import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableBlurDirective } from './directives/table-blur.directive';
import { VariationPipe } from './pipes/variation.pipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NzIconModule,
    PerfectScrollbarModule,
    SearchPipe,
    NzTableModule,
    TableBlurDirective,
    NzAlertModule,
  ],
  imports: [
    RouterModule,
    CommonModule,
    NzIconModule,
    NzToolTipModule,
    PerfectScrollbarModule,
    NzTableModule,
    NzModalModule,
    NzSkeletonModule,
    NzButtonModule,
    NzAlertModule,
  ],
  declarations: [SearchPipe, TableBlurDirective, VariationPipe],
  // providers: [ThemeConstantService, VariationPipe],
  providers: [VariationPipe],
})
export class SharedModule {}
