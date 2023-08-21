import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HtmlContentService } from 'src/app/shared/services/html-content.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent {
  constructor(
    private contentService: HtmlContentService,
    private nzMessageService: NzMessageService
  ) {}
  loading: boolean = false;
  @Input() editorContent: any;

  onSave(): any {
    if (this.editorContent.content) {
      this.loading = true;
      this.contentService
        .updateContent(this.editorContent.report, this.editorContent)
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
      this.loading = true;
      this.contentService.createContent(this.editorContent).subscribe({
        next: () => {
          this.nzMessageService.success('Content Saved');
          this.loading = false;
        },
        error: (error: any) => {
          this.nzMessageService.error('Error: ', error);
          this.loading = false;
        },
      });
    }
  }
}