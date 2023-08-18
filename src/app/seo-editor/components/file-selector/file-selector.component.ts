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
  entityKeys: any[] = ['Entity', 'Variations', 'LSIKeywords'];

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

      for (const entityKey of this.entityKeys) {
        this.wordCounterService.updateWordCount(
          entityKey,
          this.selectedFile[entityKey.toLowerCase() + '_data']
        );

        this.uploadFileService
          .getWordsFromFiles(entityKey, this.selectedFile.filename)
          .subscribe((response: any[]) => {
            const entityArray = this.wordCounterService.wordObject[entityKey];
            entityArray.length = 0;

            for (const wordInfo of response) {
              entityArray.push({
                word: wordInfo.label,
                count: { summer_note: 0, meta: 0 },
              });
            }

            this.tableLoader.variationTableLoader = false;
          });
      }
    }
  }
}
