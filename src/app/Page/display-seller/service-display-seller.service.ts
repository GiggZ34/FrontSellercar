import {Inject, Injectable} from '@angular/core';
import {InterDisplaySeller} from "./inter-display-seller";
import {ApiManagementService} from "../../Services/api-management.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ServiceDisplaySellerService {

  private readonly token : String | null = null;
  private localstorage: Storage | undefined;


  constructor(@Inject(DOCUMENT) private document: Document,
    private request: ApiManagementService) {
    this.localstorage = document.defaultView?.localStorage;
    if (this.localstorage) {
    this.token = this.localstorage.getItem("token");
    this.request.setToken(this.token);
    }
  }


  async FuncDisplay():Promise<InterDisplaySeller[] | undefined>{
    return await this.request.get("api/seller/");
  }

}
