import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { WordCounterService } from '../../service/word-counter.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';

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
      // Use forkJoin to make both API calls concurrently
      forkJoin([
        this.uploadFileService.getWordsFromFiles(
          'Entity',
          this.selectedFile.filename
        ),
        this.uploadFileService.getWordsFromFiles(
          'Variations',
          this.selectedFile.filename
        ),
      ]).subscribe(([entityResponse, variationsResponse]: [any[], any[]]) => {
        // Update wordObject for 'Entity' entity type
        const entityArray = this.wordCounterService.wordObject['Entity'];
        entityArray.length = 0; // Clear the array

        for (const wordInfo of entityResponse) {
          entityArray.push({
            word: wordInfo.label,
            count: { summer_note: 0, meta: 0 },
          });
        }

        // Update wordObject for 'Variations' entity type
        const variationsArray =
          this.wordCounterService.wordObject['Variations'];
        variationsArray.length = 0; // Clear the array

        for (const wordInfo of variationsResponse) {
          variationsArray.push({
            word: wordInfo.label,
            count: { summer_note: 0, meta: 0 },
          });
        }
      });

      // this.wordCounterService.updateWordCount(
      //   'LSIKeywords',
      //   this.selectedFile.lsi_keyword_data
      // );
    }
  }
}
