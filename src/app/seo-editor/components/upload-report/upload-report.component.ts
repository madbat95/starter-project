import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadModalComponent } from './component/upload-modal/upload-modal.component';

@Component({
  selector: 'upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.scss'],
})
export class UploadReportComponent {
  constructor(
    private modalService: NzModalService,
    private NzMessageService: NzMessageService
  ) {}

  addCSV(): void {
    const modal = this.modalService.create({
      nzTitle: ' <ng-template><h2>Upload File</h2></ng-template>',
      nzContent: UploadModalComponent,
      nzClosable: true,
      nzFooter: null,
      nzCentered: true,
      nzStyle: {
        'overflow-y': 'auto',
        'max-height': '85vh',
      },
    });
  }
}
