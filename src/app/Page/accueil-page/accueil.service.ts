import { Injectable } from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";
import {Customers} from "../new-sell/inter-new-sell";

export interface SearchedUser {
  first_name:string,
  last_name:string,
  birthday:string,
  id:number
}

export interface GetId{
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  roles: String,
  concession: number
}

@Injectable({
  providedIn: 'root'
})
export class AccueilService {

  private readonly token :String | null=null;

  constructor(private request: ApiManagementService) {
    this.token = localStorage.getItem('token');
    this.request.setToken(this.token)
  }

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

  async FuncGetIDConcession():Promise<GetId[] | undefined>{
    return await this.request.get(`api/seller/`)
  }
}
