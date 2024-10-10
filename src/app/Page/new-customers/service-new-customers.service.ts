import { Injectable, Inject } from '@angular/core';
import { ApiManagementService } from '../../Services/api-management.service';
import { InterNewCustomers } from './inter-new-customers';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ServiceNewCustomersService {
  private readonly token: string | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private request: ApiManagementService
  ) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      this.token = localStorage.getItem('token');
      this.request.setToken(this.token);
    }
  }

  async addNewCustomer(body: InterNewCustomers): Promise<InterNewCustomers> {
    return this.request.post('api/customer/', body);
  }
}
