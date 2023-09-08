import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HtmlContentService } from 'src/app/shared/services/html-content.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';
import { WordCounterService } from '../../service/word-counter.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent {
  loading: boolean = false;
  @Input() reportId: number;

  constructor(
    private wordCounterService: WordCounterService,
    private contentService: HtmlContentService,
    private nzMessageService: NzMessageService,
    public tableLoaderService: TableLoaderService
  ) {}

  onSave(): any {
    let requestBody = {
      report: this.reportId,
      meta_title: this.wordCounterService.metaTitle,
      meta_description: this.wordCounterService.metaDescription,
      site_url: this.wordCounterService.siteUrl,
      content: this.wordCounterService.editorContent,
    };

    if (this.wordCounterService.editorId) {
      // Update existing content
      this.loading = true;
      this.contentService
        .updateContent(this.wordCounterService.editorId, requestBody)
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
      // Create new content
      this.loading = true;
      this.contentService.createContent(requestBody).subscribe({
        next: (response: any) => {
          this.nzMessageService.success('Content Saved');
          this.loading = false;
          this.wordCounterService.editorId = response.id;
        },
        error: (error: any) => {
          this.nzMessageService.error('Error: ', error);
          this.loading = false;
        },
      });
    }
  }
}
