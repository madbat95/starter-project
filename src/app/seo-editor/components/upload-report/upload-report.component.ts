import { Component, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadModalComponent } from './component/upload-modal/upload-modal.component';

@Component({
  selector: 'upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.scss'],
})
export class UploadReportComponent {
  @Input() reportId: number;

  constructor(
    private modalService: NzModalService
  ) {}

  addCSV(): void {
    const modal = this.modalService.create({
      nzTitle: ' <ng-template><h2>Upload File</h2></ng-template>',
      nzContent: UploadModalComponent,
      nzClosable: true,
      nzFooter: null,
      nzCentered: true,
      nzComponentParams: {
        reportId: this.reportId,
      },  
      nzStyle: {
        'overflow-y': 'auto',
        'max-height': '85vh',
      },
    });
  }
}
