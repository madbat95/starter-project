import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent {
  fileList: NzUploadFile[] = [];
  loading: boolean = false;
  uploadForm!: FormGroup;
  marketingCampaigns!: any;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      configuration_file: new FormControl(null, [Validators.required]),
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    return false;
  };

  submitForm(): void {
    if (this.fileList.length === 0) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    if (this.fileList.length > 0) {
      formData.append('configuration_file', this.fileList[0] as any);
    }
    this.uploadFileService.postFile(formData).subscribe(
      (response: any) => {
        this.notificationService.success('file uploaded.');
        this.loading = false;
        this.modal.close();
      },
      (error: any) => {
        this.notificationService.error('Failed to upload file.');
        this.loading = false;
      }
    );
  }
}
