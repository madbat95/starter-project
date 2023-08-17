import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { WordCounterService } from '../../service/word-counter.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
})
export class FileSelectorComponent implements OnInit {
  files: any[] = [];
  selectedFile: any;

  constructor(
    private uploadFileService: UploadFileService,
    private wordCounterService: WordCounterService,
    private nzMessageServicec: NzMessageService
  ) {}

  ngOnInit(): void {
    //  this.uploadFileService.file;
    this.uploadFileService.getAllFiles().subscribe({
      next: (files: any) => {
        console.log(files);
        this.uploadFileService.addFiles(files);
        // this.files = this.uploadFileService.files;
        this.uploadFileService.getFiles().subscribe((files) => {
          console.log('Files', files);
          this.files = files;
          // Perform other updates here
        });
      },
      error: () => {
        this.nzMessageServicec.error('No Files Found');
      },
    });
  }

  onFileSelectionChange() {
    if (this.selectedFile) {
      this.wordCounterService.updateWordCount(
        'Entity',
        this.selectedFile.entity_data
      );

      // Call getWordsFromFiles using switchMap
      this.uploadFileService
        .getWordsFromFiles('Entity', this.selectedFile.filename)
        .subscribe((response: any[]) => {
          const entityArray = this.wordCounterService.wordObject['Entity'];
          entityArray.length = 0;

          for (const wordInfo of response) {
            entityArray.push({
              word: wordInfo.label,
              count: { summer_note: 0, meta: 0 },
            });
          }
        });

      this.wordCounterService.updateWordCount(
        'Variations',
        this.selectedFile.variation_data
      );
      this.uploadFileService
        .getWordsFromFiles('Variations', this.selectedFile.filename)
        .subscribe((response: any[]) => {
          const entityArray = this.wordCounterService.wordObject['Variations'];
          entityArray.length = 0;

          for (const wordInfo of response) {
            entityArray.push({
              word: wordInfo.label,
              count: { summer_note: 0, meta: 0 },
            });
          }
        });

      this.wordCounterService.updateWordCount(
        'LSIKeywords',
        this.selectedFile.lsi_keyword_data
      );
      this.uploadFileService
        .getWordsFromFiles('LSIKeywords', this.selectedFile.filename)
        .subscribe((response: any[]) => {
          const entityArray = this.wordCounterService.wordObject['LSIKeywords'];
          entityArray.length = 0;

          for (const wordInfo of response) {
            entityArray.push({
              word: wordInfo.label,
              count: { summer_note: 0, meta: 0 },
            });
          }
        });
    }
  }
}

// this.wordCounterService.updateWordCount(
//   'LSIKeywords',
//   this.selectedFile.lsi_keyword_data
// );
