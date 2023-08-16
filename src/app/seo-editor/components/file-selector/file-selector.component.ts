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
    this.uploadFileService.getAllFiles().subscribe({
      next: (files: any) => {
        this.files = files;
      },
      error: () => {
        this.nzMessageServicec.error('No Files Found');
      },
    });
  }

  onFileSelectionChange() {
    if (this.selectedFile) {
      // Call getWordsFromFiles using switchMap
      this.uploadFileService
        .getWordsFromFiles('Entity', this.selectedFile.filename)
        .subscribe((response: any[]) => {
          // Update wordObject for 'Entity' entity type
          const entityArray = this.wordCounterService.wordObject['Entity'];
          entityArray.length = 0; // Clear the array

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
      this.wordCounterService.updateWordCount(
        'LSIKeywords',
        this.selectedFile.lsi_keyword_data
      );
    }
  }
}
