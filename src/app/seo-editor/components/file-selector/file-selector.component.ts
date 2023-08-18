import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { WordCounterService } from '../../service/word-counter.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

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
    private nzMessageServicec: NzMessageService,
    private tableLoader: TableLoaderService
  ) {}

  ngOnInit(): void {
    //  this.uploadFileService.file;
    this.uploadFileService.getFiles().subscribe((files) => {
      this.files = files;
      // Perform other updates here
    });

    this.uploadFileService.getAllFiles().subscribe({
      next: (files: any) => {
        this.uploadFileService.addFiles(files);
        // this.files = this.uploadFileService.files;
      },
      error: () => {
        this.nzMessageServicec.error('No Files Found');
      },
    });

    
  }

  onFileSelectionChange() {
    if (this.selectedFile) {
      console.log('selected file', this.selectedFile.filename);
      this.tableLoader.variationTableLoader = true;
      this.wordCounterService.updateWordCount(
        'Entity',
        this.selectedFile.entity_data
      );

      // Call getWordsFromFiles using switchMap
      this.uploadFileService
        .getWordsFromFiles('Entity', this.selectedFile.filename)
        .subscribe((response: any[]) => {
          console.log('response.length', response.length);
          // let entityArray = this.wordCounterService.wordObject['Entity'];
          const entityArray = []

          for (const wordInfo of response) {
            entityArray.push({
              word: wordInfo.label,
              count: { summer_note: 0, meta: 0 },
            });
          }
          this.tableLoader.variationTableLoader = false;
          this.wordCounterService.wordObject['Entity'] = entityArray
        });

      // this.wordCounterService.updateWordCount(
      //   'Variations',
      //   this.selectedFile.variation_data
      // );
      // this.uploadFileService
      //   .getWordsFromFiles('Variations', this.selectedFile.filename)
      //   .subscribe((response: any[]) => {
      //     const entityArray = this.wordCounterService.wordObject['Variations'];
      //     entityArray.length = 0;

      //     for (const wordInfo of response) {
      //       entityArray.push({
      //         word: wordInfo.label,
      //         count: { summer_note: 0, meta: 0 },
      //       });
      //     }
      //     this.tableLoader.variationTableLoader = false;
      //   });

      // this.wordCounterService.updateWordCount(
      //   'LSIKeywords',
      //   this.selectedFile.lsi_keyword_data
      // );
      // this.uploadFileService
      //   .getWordsFromFiles('LSIKeywords', this.selectedFile.filename)
      //   .subscribe((response: any[]) => {
      //     const entityArray = this.wordCounterService.wordObject['LSIKeywords'];
      //     entityArray.length = 0;

      //     for (const wordInfo of response) {
      //       entityArray.push({
      //         word: wordInfo.label,
      //         count: { summer_note: 0, meta: 0 },
      //       });
      //     }
      //     this.tableLoader.variationTableLoader = false;
      //   });
    }
  }
}

// this.wordCounterService.updateWordCount(
//   'LSIKeywords',
//   this.selectedFile.lsi_keyword_data
// );
