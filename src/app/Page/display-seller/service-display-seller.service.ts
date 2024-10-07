import { Injectable } from '@angular/core';
import {InterDisplaySeller} from "./inter-display-seller";
import {ApiManagementService} from "../../Services/api-management.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceDisplaySellerService {

  constructor(private request: ApiManagementService) { }


  async FuncDisplay():Promise<InterDisplaySeller | undefined>{
    return await this.request.get("api/seller/")
  }

}
