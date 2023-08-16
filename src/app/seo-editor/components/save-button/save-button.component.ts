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
    console.log('edirtor content', this.editorContent);
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
