import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private http: HttpClient) {}

  getOrganizations() {
    return this.http.get('organizations/');
  }

  createOrganization(requestBody: any) {
    return this.http.post('organizations/', requestBody);
  }

  // updateOrganization(id: any, requestBody: any) {
  //   return this.http.patch(`organizations/${id}/`, requestBody);
  // }

  updateOrganization(id: any, requestBody: any) {
    return this.http.get(`organizations/${id}/`);
  }
  updateOrganizationInfo(id: any, infoId: any, requestBody: any) {
    return this.http.patch(`organizations/${id}/info/${infoId}`, requestBody);
  }
  updateOrganizationAddress(id: any, addressId: any, requestBody: any) {
    return this.http.patch(
      `organizations/${id}/address/${addressId}/`,
      requestBody
    );
  }

  createOrganizationInfo(id: any, requestBody: any) {
    return this.http.post(`organizations/${id}/info/`, requestBody);
  }
  createOrganizationAddress(id: any, requestBody: any) {
    return this.http.post(`organizations/${id}/address/`, requestBody);
  }

  deleteOrganization(id: any) {
    return this.http.delete(`organizations/${id}/`);
  }

  getOrganization(id: any) {
    return this.http.get(`organizations/${id}/`);
  }
}
