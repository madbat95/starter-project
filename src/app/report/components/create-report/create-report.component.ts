import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
})
export class CreateReportComponent implements OnInit {
  reportsForm!: FormGroup;
  isLoading: boolean = false;
  @Output() onNewReport: any = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private reportService: ReportService
  ) {
    this.reportsForm = this.fb.group({
      company: new FormControl('1', Validators.required),
      keyword: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      related_keywords: new FormControl('', [Validators.required]),
      country: new FormControl('US', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reportsForm.valid) {
      this.isLoading = true;

      this.reportService.createReport(this.reportsForm.value).subscribe({
        next: (newReport: any) => {
          this.isLoading = false;
          this.notificationService.success('Report Submitted');
          this.onNewReport.emit(newReport);
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.warning('Submission Failed');
        },
      });
    } else {
      Object.values(this.reportsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
