import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { WordCounterService } from 'src/app/seo-editor/service/word-counter.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-meta-info',
  templateUrl: './meta-info.component.html',
  styleUrls: ['./meta-info.component.scss'],
})
export class MetaInfoComponent {
  @Output() metaTitle = new EventEmitter<any>();
  @Output() metaDescription = new EventEmitter<any>();
  @Output() formValuesEmitter = new EventEmitter<any>();
  metaForm!: FormGroup;
  constructor(
    private wordCounter: WordCounterService,
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {
    this.metaForm = this.fb.group({
      metaTitle: new FormControl('', Validators.required),
      metaDescription: new FormControl('', Validators.required),
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
      console.log(
        'metaElementCount',
        metaElementCount,
        this.metaForm.value.metaTitle
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
      console.log(
        'metaElementCount2',
        metaElementCount2,
        this.metaForm.value.metaDescription
      );
      this.metaDescription.emit(metaElementCount2);

      this.formValuesEmitter.emit(this.metaForm.value);
      this.modal.close();
    }
  }
}
