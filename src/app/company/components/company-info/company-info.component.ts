import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent {
  companyForm!: FormGroup;
  loading: boolean = false;
  isLoading: boolean;
  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      company_name: new FormControl(''),
      company_EIN: new FormControl(''),
      company_FinCENId: new FormControl(''),
      company_type: new FormControl(''),
      company_state: new FormControl(''),
      company_formation_year: new FormControl(''),
      DBA_name: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      zip_code: new FormControl(''),
      country: new FormControl(''),
      foreign: new FormControl('no', []),
      foreing_jurisdiction: new FormControl(''),
      US_state: new FormControl(''),
      BOI_report_status: new FormControl(''),
    });
  }

  updateCompany(): any {}
}
