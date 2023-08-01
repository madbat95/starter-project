import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-meta-info',
  templateUrl: './meta-info.component.html',
  styleUrls: ['./meta-info.component.scss'],
})
export class MetaInfoComponent {
  metaForm!: FormGroup;
  constructor(
    private modalService: NzModalService,
    private modal: NzModalRef,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.metaForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
}
