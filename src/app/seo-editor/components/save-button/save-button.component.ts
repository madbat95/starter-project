import { Component, Input } from '@angular/core';
import { HtmlContentService } from 'src/app/shared/services/html-content.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent {
  constructor(private contentService: HtmlContentService) {}
  @Input() editorContent: any;

  onSave(body): any {
    this.contentService.createContent(body).subscribe(() => {});
  }
}
