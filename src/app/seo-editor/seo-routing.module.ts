import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeoEditorComponent } from './seo-editor.component';

const routes: Routes = [
  {
    path: '',
    component: SeoEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeoRoutingModule {}
