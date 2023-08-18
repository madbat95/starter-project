import { Component, Output, EventEmitter } from '@angular/core';
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
import { WordCounterService } from 'src/app/seo-editor/service/word-counter.service';
import { forkJoin } from 'rxjs';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class UploadModalComponent {
  @Output() onFile = new EventEmitter<any>();
  fileList: NzUploadFile[] = [];
  uploadForm!: FormGroup;
  wordArray: any[] = [];
  fileName: any = '';
  fileData: any[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private uploadFileService: UploadFileService,
    private wordCounterService: WordCounterService,
    public tableLoader: TableLoaderService
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

  //   this.uploadFileService
  //     .postFile(formData)
  //     .pipe(
  //       switchMap((postResponse: any) => {
  //         this.notificationService.success('File uploaded.');
  //         return this.uploadFileService.getFile(this.fileName);
  //       }),
  //       switchMap((fileResponse: any) => {
  //         const latestObject = fileResponse[fileResponse.length - 1];
  //         return this.uploadFileService.getWordsFromFiles(
  //           'Entity',
  //           latestObject.filename
  //         );
  //       }),
  //       catchError((error: any) => {
  //         this.notificationService.error('Failed to upload file.');
  //         return error;
  //       })
  //     )
  //     .subscribe(
  //       (wordResponse: any) => {
  //         console.log('Words from file:', wordResponse);

  //         // Append the wordResponse data to the fileData array
  //         this.fileData.push(wordResponse);

  //         this.loading = false;
  //         this.modal.close();
  //       },
  //       (error: any) => {
  //         console.error('Failed to get file:', error);
  //         this.loading = false;
  //       }
  //     );
  // }

  // submitForm(): void {
  //   if (this.fileList.length === 0) {
  //     return;
  //   }
  //   this.loading = true;
  //   const formData = new FormData();
  //   if (this.fileList.length > 0) {
  //     formData.append('configuration_file', this.fileList[0] as any);
  //   }

  //   this.uploadFileService
  //     .postFile(formData)
  //     .pipe(
  //       switchMap((postResponse: any) => {
  //         this.notificationService.success('File uploaded.');
  //         return this.uploadFileService.getFile(this.fileName);
  //       }),
  //       switchMap((fileResponse: any) => {
  //         const latestObject = fileResponse[fileResponse.length - 1];
  //         return this.uploadFileService.getWordsFromFiles(
  //           'Entity',
  //           latestObject.filename
  //         );
  //       }),
  //       catchError((error: any) => {
  //         this.notificationService.error('Failed to upload file.');
  //         return error;
  //       })
  //     )
  //     .subscribe(
  //       (wordResponse: any) => {
  //         console.log('Words from file:', wordResponse);

  //         // Update the wordObject with labels from the wordResponse
  //         const entityType = 'Entity'; // Adjust if needed
  //         const entityArray = this.wordCounterService.wordObject[entityType];
  //         for (const wordInfo of wordResponse) {
  //           const word = wordInfo.label;

  //           // Add the word to the wordObject if it doesn't exist
  //           if (!entityArray.some((entity) => entity.word === word)) {
  //             entityArray.push({
  //               word: word,
  //               count: { summer_note: 0, meta: 0 },
  //             });
  //           }
  //         }

  //         this.loading = false;
  //         this.modal.close();
  //       },
  //       (error: any) => {
  //         console.error('Failed to get file:', error);
  //         this.loading = false;
  //       }
  //     );
  // }
  submitForm(): void {
    if (this.fileList.length === 0) {
      return;
    }
    this.tableLoader.variationTableLoader = true;
    this.isLoading = true;
    const formData = new FormData();
    if (this.fileList.length > 0) {
      formData.append('configuration_file', this.fileList[0] as any);
    }

    this.uploadFileService
      .postFile(formData)
      .pipe(
        switchMap((postResponse: any) => {
          this.notificationService.success('File uploaded.');
          this.uploadFileService.addFiles(postResponse);
          return this.uploadFileService.getFile(this.fileName);
        }),
        switchMap((fileResponse: any) => {
          const latestObject = fileResponse[fileResponse.length - 1];
          const entityTypes = ['Entity', 'Variations', 'LSIKeywords'];

          // Here i am fetching words for each entity type using forkJoin
          const fetchWordObservables = entityTypes.map((entityType) => {
            return this.uploadFileService.getWordsFromFiles(
              entityType,
              latestObject.filename
            );
          });

          return forkJoin(fetchWordObservables);
        }),
        catchError((error: any) => {
          this.notificationService.error('Failed to upload file.');
          return error;
        })
      )
      .subscribe(
        (wordsResponses: any[]) => {
          console.log('Words from file for each entity type:', wordsResponses);

          // Update the wordObject for each entity type
          for (let i = 0; i < wordsResponses.length; i++) {
            const entityTypes = ['Entity', 'Variations', 'LSIKeywords'];
            const entityType = entityTypes[i];
            const wordsResponse = wordsResponses[i];

            const entityArray = this.wordCounterService.wordObject[entityType];
            for (const wordInfo of wordsResponse) {
              const word = wordInfo.label;

              // Add the word to the wordObject if it doesn't exist
              if (!entityArray.some((entity) => entity.word === word)) {
                entityArray.push({
                  word: word,
                  count: { summer_note: 0, meta: 0 },
                });
              }
            }
          }

          this.tableLoader.variationTableLoader = false;
          this.isLoading = false;
          this.modal.close();
        },
        (error: any) => {
          console.error('Failed to get file:', error);
          this.tableLoader.variationTableLoader = false;
          this.isLoading = false;
        }
      );
  }
}
