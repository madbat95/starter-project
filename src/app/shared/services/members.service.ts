import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  // getMemebrs(id: any) {
  //   return this.http.get(`organization/user/${id}/`);
  // }

  getMemebrs(id: any) {
    return this.http.get(`organizations/${id}/user_group/`);
  }

  getOrganizationRoles(id: any) {
    return this.http.get(`organizations/${id}/group/`);
  }

  sendInvite(requestBody: any) {
    return this.http.post('organization/user/invite_user/', requestBody);
  }
}
