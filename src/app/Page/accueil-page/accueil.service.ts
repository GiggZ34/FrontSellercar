import { Injectable } from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";

export interface SearchedUser {
  first_name:String,
  last_name:String,
  birthday:String,
}

@Injectable({
  providedIn: 'root'
})
export class AccueilService {

  constructor(private request: ApiManagementService) { }

  async findUserCall(firstName:String | null, lastName:String | null):Promise<SearchedUser[] | undefined>{

    if(firstName && lastName){
      return await this.request.get(`api/customer/?first_name=${firstName}&last_name=${lastName}`)
    }
    else if(firstName && !lastName){
      return await this.request.get(`api/customer/?first_name=${firstName}`)
    }
    else if(lastName && !firstName){
      return await this.request.get(`api/customer/?last_name=${lastName}`)
    }
    else{
      return await this.request.get(`api/customer/`)
    }
  }

}
