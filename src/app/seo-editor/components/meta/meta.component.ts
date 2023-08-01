import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MetaInfoComponent } from './components/meta-info/meta-info.component';

@Component({
  selector: 'meta-button',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
})
export class MetaComponent {
  constructor(private modalService: NzModalService) {}

  addMeta(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Meta',
      nzContent: MetaInfoComponent,
      nzFooter: null,
      nzCentered: true,
      nzStyle: {
        'overflow-y': 'auto',
        // 'max-height': '500px',
        // 'max-width': '1000px',
      },
    });
  }
}
