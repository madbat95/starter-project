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

            (this.wordCounterService.wordCount['Entity'].metaTitleR =
              latestObject['entity_data'].title),
              (this.wordCounterService.wordCount['Entity'].metaDescriptionR =
                latestObject['entity_data'].description),
              (this.wordCounterService.wordCount['Entity'].headers.H1R =
                latestObject['entity_data'].h1),
              (this.wordCounterService.wordCount['Entity'].headers.H2R =
                latestObject['entity_data'].h2),
              (this.wordCounterService.wordCount['Entity'].headers.H3R =
                latestObject['entity_data'].h3),
              (this.wordCounterService.wordCount['Entity'].headers.H4R =
                latestObject['entity_data'].h4),
              (this.wordCounterService.wordCount['Entity'].headers.H5R =
                latestObject['entity_data'].h5),
              (this.wordCounterService.wordCount['Entity'].headers.H6R =
                latestObject['entity_data'].h6),
              (this.wordCounterService.wordCount['Entity'].contentR =
                latestObject['entity_data'].sentences);

            (this.wordCounterService.wordCount['Variations'].metaTitleR =
              latestObject['variation_data'].title),
              (this.wordCounterService.wordCount[
                'Variations'
              ].metaDescriptionR = latestObject['variation_data'].description),
              (this.wordCounterService.wordCount['Variations'].headers.H1R =
                latestObject['variation_data'].h1),
              (this.wordCounterService.wordCount['Variations'].headers.H2R =
                latestObject['variation_data'].h2),
              (this.wordCounterService.wordCount['Variations'].headers.H3R =
                latestObject['variation_data'].h3),
              (this.wordCounterService.wordCount['Variations'].headers.H4R =
                latestObject['variation_data'].h4),
              (this.wordCounterService.wordCount['Variations'].headers.H5R =
                latestObject['variation_data'].h5),
              (this.wordCounterService.wordCount['Variations'].headers.H6R =
                latestObject['variation_data'].h6),
              (this.wordCounterService.wordCount['Variations'].contentR =
                latestObject['variation_data'].sentences);
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
