import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-billing-information',
  templateUrl: './billing-information.component.html',
  styleUrls: ['./billing-information.component.scss'],
})
export class BillingInformationComponent {
  billingForm!: FormGroup;
  loading: boolean = false;
  isLoading: boolean;
  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      company_name: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      address3: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      country: new FormControl(''),
      sameAddress: new FormControl('yes'),
    });
  }

  updateInformataion(): any {}
}
