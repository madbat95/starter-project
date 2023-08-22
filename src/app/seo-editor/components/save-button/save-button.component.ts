import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HtmlContentService } from 'src/app/shared/services/html-content.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent {
  constructor(
    private contentService: HtmlContentService,
    private nzMessageService: NzMessageService,
    public tableLoaderService: TableLoaderService
  ) {}
  loading: boolean = false;
  @Input() editorContent: any;
  id: any;

  // onSave(): any {
  //   console.log({
  //     content: this.editorContent.content,
  //   });
  //   if (this.contentService.contentRetrieved) {
  //     // this.tableLoaderService.summernoteLoader = true;
  //     this.loading = true;
  //     this.contentService
  //       .updateContent(this.editorContent.report, {
  //         content: this.editorContent.content,
  //       })
  //       .subscribe({
  //         next: () => {
  //           this.nzMessageService.success('Content updated');
  //           this.loading = false;
  //           // this.tableLoaderService.summernoteLoader = false;
  //         },
  //         error: () => {
  //           this.nzMessageService.error('Content update failed');
  //           this.loading = false;
  //           // this.tableLoaderService.summernoteLoader = true;
  //         },
  //       });
  //   } else {
  //     this.loading = true;
  //     // this.tableLoaderService.summernoteLoader = true;
  //     this.contentService.createContent(this.editorContent).subscribe({
  //       next: (response: any) => {
  //         this.nzMessageService.success('Content Saved');
  //         this.loading = false;
  //         this.id = response.id;
  //         this.contentService.contentRetrieved = true;
  //         // this.tableLoaderService.summernoteLoader = false;
  //       },
  //       error: (error: any) => {
  //         this.nzMessageService.error('Error: ', error);
  //         this.loading = false;
  //         // this.tableLoaderService.summernoteLoader = false;
  //       },
  //     });
  //   }
  // }
  onSave(): any {
    console.log({
      content: this.editorContent.content,
    });

    if (this.contentService.contentRetrieved) {
      if (this.id) {
        // Update existing content
        this.loading = true;
        this.contentService
          .updateContent(this.id, {
            content: this.editorContent.content,
          })
          .subscribe({
            next: () => {
              this.nzMessageService.success('Content updated');
              this.loading = false;
            },
            error: () => {
              this.nzMessageService.error('Content update failed');
              this.loading = false;
            },
          });
      } else {
        // Existing content, but id doesn't exist
        this.loading = true;
        this.contentService
          .updateContent(this.editorContent.report, {
            content: this.editorContent.content,
          })
          .subscribe({
            next: () => {
              this.nzMessageService.success('Content updated');
              this.loading = false;
            },
            error: () => {
              this.nzMessageService.error('Content update failed');
              this.loading = false;
            },
          });
      }
    } else {
      // Create new content
      this.loading = true;
      this.contentService.createContent(this.editorContent).subscribe({
        next: (response: any) => {
          this.nzMessageService.success('Content Saved');
          this.loading = false;
          this.id = response.id;
          this.contentService.contentRetrieved = true;
        },
        error: (error: any) => {
          this.nzMessageService.error('Error: ', error);
          this.loading = false;
        },
      });
    }
  }
}
