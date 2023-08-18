import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { SeoEditorComponent } from '../seo-editor/seo-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
  },
  {
    path: ':id',
    component: SeoEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
