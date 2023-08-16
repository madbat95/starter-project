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
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WordCounterService } from 'src/app/seo-editor/service/word-counter.service';

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
  fileName: any = '';
  fileData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private uploadFileService: UploadFileService,
    private wordCounterService: WordCounterService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      configuration_file: new FormControl(null, [Validators.required]),
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileName = file.name;
    this.fileList = [file];
    return false;
  };

  // submitForm(): void {
  //   if (this.fileList.length === 0) {
  //     return;
  //   }
  //   this.loading = true;
  //   const formData = new FormData();
  //   if (this.fileList.length > 0) {
  //     formData.append('configuration_file', this.fileList[0] as any);
  //   }
  //   this.uploadFileService.postFile(formData).subscribe(
  //     (response: any) => {
  //       this.notificationService.success('file uploaded.');
  //       this.loading = false;
  //       this.modal.close();
  //     },
  //     (error: any) => {
  //       this.notificationService.error('Failed to upload file.');
  //       this.loading = false;
  //     }
  //   );
  // }
  submitForm(): void {
    if (this.fileList.length === 0) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    if (this.fileList.length > 0) {
      formData.append('configuration_file', this.fileList[0] as any);
    }

    this.uploadFileService
      .postFile(formData)
      .pipe(
        switchMap((postResponse: any) => {
          this.notificationService.success('File uploaded.');
          return this.uploadFileService.getFile(this.fileName);
        }),
        catchError((error: any) => {
          this.notificationService.error('Failed to upload file.');
          return error;
        })
      )
      .subscribe(
        (response: any) => {
          console.log('File content:', response);

          // Assuming that the response is an array of objects
          if (Array.isArray(response) && response.length > 0) {
            const latestObject = response[response.length - 1];
            this.fileData.push(latestObject); // Add the latest object to the fileData array
            console.log(this.fileData);

            this.wordCounterService.updateWordCount(
              'Entity',
              latestObject['entity_data']
            );
            this.wordCounterService.updateWordCount(
              'Variations',
              latestObject['variation_data']
            );
            this.wordCounterService.updateWordCount(
              'LSIKeywords',
              latestObject['lsi_keyword_data']
            );
          }

          this.loading = false;
          this.modal.close();
        },
        (error: any) => {
          console.error('Failed to get file:', error);
          this.loading = false;
        }
      );
  }
}
