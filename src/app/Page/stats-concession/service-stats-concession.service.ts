  import {Inject, Injectable} from '@angular/core';
  import {InterStatsConcession} from "./inter-stats-concession";
  import {ApiManagementService} from "../../Services/api-management.service";
  import {DOCUMENT} from "@angular/common";

  @Injectable({
    providedIn: 'root'
  })
  export class ServiceStatsConcessionService {

    private readonly token: string | null = null;

    constructor(private request: ApiManagementService,
                @Inject(DOCUMENT) private document: Document,) {

        const localStorage = this.document.defaultView?.localStorage;
        if (localStorage) {
          this.token = localStorage.getItem('token');
          this.request.setToken(this.token);
        }
      }


    async  FuncStatConcession():Promise<InterStatsConcession[] | undefined>{
      return await this.request.get(`api/stat_concession/`);
    }
  }
