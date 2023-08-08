import { Component, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MetaInfoComponent } from './components/meta-info/meta-info.component';
import { WordCounterService } from '../../service/word-counter.service';

@Component({
  selector: 'meta-button',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
})
export class MetaComponent {
  constructor(
    private modalService: NzModalService,
    private wordCounter: WordCounterService
  ) {}
  // @Output() metaTitle = new EventEmitter<any>();
  // @Output() metaDescription = new EventEmitter<any>();

  addMeta(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Meta',
      nzContent: MetaInfoComponent,
      nzFooter: null,
      nzCentered: true,
      nzStyle: {
        'overflow-y': 'auto',
        // 'max-height': '500px',
        // 'max-width': '1000px',
      },
    });
    modal.componentInstance.metaTitle.subscribe((metaTitle: any) => {
      for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
        this.wordCounter.wordCount[entityType].metaTitle =
          metaTitle[entityType].content;
      }
    });
    modal.componentInstance.metaDescription.subscribe(
      (metaDescription: any) => {
        for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
          this.wordCounter.wordCount[entityType].metaDescription =
            metaDescription[entityType].content;
        }
        console.log('wordcount', this.wordCounter.wordCount);
      }
    );
  }
}
