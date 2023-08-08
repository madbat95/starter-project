import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { WordCounterService } from 'src/app/seo-editor/service/word-counter.service';

@Component({
  selector: 'app-meta-info',
  templateUrl: './meta-info.component.html',
  styleUrls: ['./meta-info.component.scss'],
})
export class MetaInfoComponent {
  @Output() metaTitle = new EventEmitter<any>();
  @Output() metaDescription = new EventEmitter<any>();
  metaForm!: FormGroup;
  constructor(
    private wordCounter: WordCounterService,
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {
    this.metaForm = this.fb.group({
      metaTitle: new FormControl('privacy', Validators.required),
      metaDescription: new FormControl('privacy', Validators.required),
    });
  }

  onSubmit() {
    if (this.metaForm.valid) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        this.metaForm.value.metaTitle,
        'text/html'
      );

      const metaElementCount = this.wordCounter.countWordsInHeadersAndContent(
        doc.body,
        []
      );

      this.metaTitle.emit(metaElementCount);

      const parser2 = new DOMParser();
      const doc2 = parser2.parseFromString(
        this.metaForm.value.metaDescription,
        'text/html'
      );
      const metaElementCount2 = this.wordCounter.countWordsInHeadersAndContent(
        doc2.body,
        []
      );

      this.metaDescription.emit(metaElementCount2);

      this.modal.close({
        title: metaElementCount,
        description: metaElementCount2,
      });
    }
  }
}
