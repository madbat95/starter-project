import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgChartjsModule } from 'ng-chartjs';

import { ThemeConstantService } from '../shared/services/theme-constant.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SeoEditorComponent } from './seo-editor.component';
import { SuggestionTableComponent } from './components/suggestion-table/suggestion-table.component';
import { SeoRoutingModule } from './seo-routing.module';
import { VariationTableComponent } from './components/variation-table/variation-table.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SearchComponent } from './components/search/search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FilterComponent } from './components/filter/filter.component';
import { UploadReportComponent } from './components/upload-report/upload-report.component';
import { MetaComponent } from './components/meta/meta.component';
import { SummernoteComponent } from './components/summernote/summernote.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { TableRadioComponent } from './components/table-radio/table-radio.component';
import { WordCounterService } from './service/word-counter.service';
import { TableDataRowComponent } from './components/suggestion-table/components/table-data-row/table-data-row.component';

const antdModule = [
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTimelineModule,
  NzTabsModule,
  NzTagModule,
  NzListModule,
  NzCalendarModule,
  NzToolTipModule,
  NzCheckboxModule,
  NzSkeletonModule,
  NzModalModule,
  NzDividerModule,
  NzGridModule,
  NzRadioModule,
  NzInputModule,
  NzModalModule,
  NzFormModule,
  NzProgressModule,
];

@NgModule({
  imports: [
    SeoRoutingModule,
    CommonModule,
    SharedModule,
    NgChartjsModule,
    NgxSummernoteModule,
    ReactiveFormsModule,
    NzBadgeModule,
    ...antdModule,
  ],
  exports: [],
  declarations: [
    SeoEditorComponent,
    SuggestionTableComponent,
    VariationTableComponent,
    SearchComponent,
    FilterComponent,
    UploadReportComponent,
    MetaComponent,
    SummernoteComponent,

    TableRadioComponent,
    TableDataRowComponent,
  ],
  providers: [ThemeConstantService, WordCounterService],
})
export class SeoModule {}
