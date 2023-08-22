import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { WordCounterService } from '../../service/word-counter.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';
import { SummernoteComponent } from '../summernote/summernote.component';

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
    private tableLoader: TableLoaderService,
    private summernote: SummernoteComponent
  ) {}

  ngOnInit(): void {
    this.uploadFileService.getFiles().subscribe((files) => {
      this.files = files;
    });

    this.uploadFileService.getAllFiles().subscribe({
      next: (files: any) => {
        this.uploadFileService.addFiles(files);
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
          this.selectedFile[entityKey]
        );

        this.uploadFileService
          .getWordsFromFiles(entityKey, this.selectedFile.filename)
          .subscribe((response: any[]) => {
            let entityArray = [];
            for (const wordInfo of response) {
              entityArray.push({
                word: wordInfo.label,
                count: { summer_note: 0, meta: 0 },
              });
            }
            this.wordCounterService.wordObject[entityKey] = entityArray;
            //updating count
            this.summernote.onEditorContentChange(
              this.summernote.editorContent
            );
            this.tableLoader.variationTableLoader = false;
          });
      }
    }
  }
}
