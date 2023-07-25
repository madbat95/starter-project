import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ConstructionRoutingModule } from './front-routing.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConstructionRoutingModule,
    NzButtonModule,
    NzCarouselModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzToolTipModule,
    NzRadioModule,
    NzIconModule,
    NzAffixModule,
    NzTagModule,
    NzUploadModule,
    NzListModule,
    NzDividerModule,
    NzSpinModule,
    NzSkeletonModule,
    NzTableModule,
    NzEmptyModule,
  ],
  providers: [NzModalService],
})
export class FrontModule {}
