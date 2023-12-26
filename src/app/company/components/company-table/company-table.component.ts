import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { CompanyInfoComponent } from '../company-info/company-info.component';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
})
export class CompanyTableComponent implements OnInit {
  organizations: any;
  loading: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private messageService: NzMessageService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations(): void {
    this.loading = true;
    this.organizationService.getOrganizations().subscribe({
      next: (organizations: any) => {
        this.organizations = organizations.results;
        this.loading = false;
      },
      error: () => {
        this.messageService.error('could not retrieve list of organizations');
        this.loading = false;
      },
    });
  }

  viewCompany(id: any) {
    console.log('id', id);
    this.router.navigate(['companydetails'], {
      relativeTo: this.route,
      queryParams: { tab: 'companyinformation', companyId: id },
    });
  }

  deleteOrganization(id: number): void {
    this.loading = true;
    this.organizationService
      .deleteOrganization(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        let i = this.organizations.findIndex((j: any) => j.id == id);
        this.organizations.splice(i, 1);
        this.organizations = [...this.organizations];
        this.messageService.success('company was successfully deleted!');
      });
  }

  createOrganization(): void {
    const modal = this.modalService.create({
      nzTitle:
        '<ng-template><h2 class="text-[23px]">Create Organization</h2></ng-template>',
      nzContent: CompanyInfoComponent,
      nzWidth: 1200,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.organizations.push(res);
      }
    });
  }

  editOrganization(id): void {
    const modal = this.modalService.create({
      nzTitle:
        '<ng-template><h2 class="text-[23px]">Create Organization</h2></ng-template>',
      nzContent: CompanyInfoComponent,
      nzWidth: 1200,
      nzFooter: null,
      nzComponentParams: { companyId: id },
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.organizations.push(res);
      }
    });
  }
}
