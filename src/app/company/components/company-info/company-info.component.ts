import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OrganizationService } from 'src/app/shared/services/organization.service';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent {
  companyForm!: FormGroup;
  loading: boolean = false;
  @Input() companyId: string;
  isLoading: boolean;
  organization_id: any;
  constructor(
    private organizationService: OrganizationService,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService
  ) {
    this.companyForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      ein: new FormControl('', [Validators.required]),
      fincen_id: new FormControl('', [Validators.required]),
      // company_formation_year: new FormControl(''), //not a field yet
      dba_name: new FormControl('', [Validators.required]), //info
      type: new FormControl('', [Validators.required]), // info
      is_foreign: new FormControl('no', [Validators.required]), //info
      address_line1: new FormControl('', [Validators.required]), //address
      address_line2: new FormControl(''), //address
      address_line3: new FormControl(''), //address
      state: new FormControl(''), //address
      city: new FormControl(''), //address
      zip_code: new FormControl(''), //address
      country: new FormControl(''), //address
      origin_country: new FormControl(''), //info
      registered_at: new FormControl(''), //info
      // BOI_report_status: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.companyId) {
      console.log(this.companyId);
      this.organizationService.getOrganization(this.companyId).subscribe(
        (organization: any) => {
          const organizationInfo = organization.organization_info;

          const organizationAddresses =
            organizationInfo?.organization_addresses;

          if (
            organizationInfo &&
            organizationAddresses &&
            organizationAddresses.length > 0
          ) {
            const address = organizationAddresses[0];

            this.companyForm.patchValue({
              name: organization.name,
              ein: organization.ein,
              fincen_id: organization.fincen_id,
              dba_name: organizationInfo.dba_name,
              type: organizationInfo.type,
              is_foreign: organizationInfo.is_foreign,
              origin_country: organizationInfo.origin_country,
              registered_at: organizationInfo.registered_at,
              address_line1: address.address_line1,
              address_line2: address.address_line2,
              address_line3: address.address_line3,
              state: address.state,
              city: address.city,
              zip_code: address.zip_code,
              country: address.country,
            });
          } else {
            console.error(
              'Error: Organization data is incomplete or undefined.'
            );
          }
        },
        (error) => {
          console.error('Error fetching organization data', error);
        }
      );
    }
  }

  // submitCompany(): void {
  //   this.loading = true;

  //   const organizationData = {
  //     name: this.companyForm.value.name,
  //     ein: this.companyForm.value.ein,
  //     fincen_id: this.companyForm.value.fincen_id,
  //     tin: '1234650',
  //     slug: '12354',
  //   };

  //   this.organizationService
  //     .createOrganization(organizationData)
  //     .pipe(
  //       switchMap((orgResponse: any) => {
  //         const orgId = orgResponse.id;

  //         const organizationInfoData = {
  //           dba_name: this.companyForm.value.dba_name,
  //           type: this.companyForm.value.type,
  //           is_foreign: this.companyForm.value.foreign,
  //         };

  //         return this.organizationService.createOrganizationInfo(
  //           orgId,
  //           organizationInfoData
  //         );
  //       }),
  //       switchMap((orgInfoResponse: any) => {
  //         const orgId = orgInfoResponse.id;

  //         const organizationAddressData = {
  //           address_line1: this.companyForm.value.address_line1,
  //           address_line2: this.companyForm.value.address_line2,
  //           address_line3: this.companyForm.value.address_line3,
  //           state: this.companyForm.value.state,
  //           city: this.companyForm.value.city,
  //           zip_code: this.companyForm.value.zip_code,
  //           country: this.companyForm.value.country,
  //         };

  //         return this.organizationService.createOrganizationAddress(
  //           orgId,
  //           organizationAddressData
  //         );
  //       }),
  //       catchError((error) => {
  //         console.error('Error submitting company information', error);
  //         return of(null);
  //       })
  //     )
  //     .subscribe(
  //       () => {
  //         this.loading = false;
  //         this.nzMessageService.success(
  //           'Company information submitted successfully'
  //         );
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.nzMessageService.error('Failed to submit company information');
  //       }
  //     );
  // }
  submitCompany(): void {
    this.loading = true;

    const organizationData = {
      name: this.companyForm.value.name,
      ein: this.companyForm.value.ein,
      fincen_id: this.companyForm.value.fincen_id,
      tin: '1234650',
      slug: '12354',
    };

    let submitObservable;
    if (this.companyId) {
      submitObservable = this.organizationService.updateOrganization(
        this.companyId,
        organizationData
      );
    } else {
      submitObservable =
        this.organizationService.createOrganization(organizationData);
    }

    submitObservable
      .pipe(
        switchMap((orgResponse: any) => {
          const organizationInfoData = {
            dba_name: this.companyForm.value.dba_name,
            type: this.companyForm.value.type,
            is_foreign: this.companyForm.value.foreign,
            origin_country: this.companyForm.value.origin_country,
            registered_at: this.companyForm.value.registered_at,
          };

          let infoObservable;
          if (this.companyId) {
            infoObservable = this.organizationService.updateOrganizationInfo(
              this.companyId,
              orgResponse.organization_info.id,
              organizationInfoData
            );
          } else {
            infoObservable = this.organizationService.createOrganizationInfo(
              this.organization_id,
              organizationInfoData
            );
          }

          return infoObservable;
        }),
        switchMap((orgInfoResponse: any) => {
          const addressId = orgInfoResponse.organization_addresses[0].id;

          const organizationAddressData = {
            address_line1: this.companyForm.value.address_line1,
            address_line2: this.companyForm.value.address_line2,
            address_line3: this.companyForm.value.address_line3,
            state: this.companyForm.value.state,
            city: this.companyForm.value.city,
            zip_code: this.companyForm.value.zip_code,
            country: this.companyForm.value.country,
          };

          let addressObservable;
          if (this.companyId) {
            addressObservable =
              this.organizationService.updateOrganizationAddress(
                this.companyId,
                addressId,
                organizationAddressData
              );
          } else {
            addressObservable =
              this.organizationService.createOrganizationAddress(
                this.organization_id,
                organizationAddressData
              );
          }

          return addressObservable;
        }),
        catchError((error) => {
          console.error('Error submitting company information', error);
          return of(null);
        })
      )
      .subscribe(
        (response: any) => {
          this.loading = false;
          console.log('response', response);
          this.nzMessageService.success(
            'Company information submitted successfully'
          );
        },
        (error) => {
          this.loading = false;
          this.nzMessageService.error('Failed to submit company information');
        }
      );
  }
}
