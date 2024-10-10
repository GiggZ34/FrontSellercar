import {Injectable, OnInit} from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";

export interface AllSale {
  id: number,
  seller: {
    roles: string,
    first_name: string,
    last_name: string,
    username: string,
    concession: number,
  },
  carmodel: {
    model: string,
    price: number
  },
  customer: {
    first_name: string,
    last_name: string,
    birthday: string,
  },
  options: [
    {
      model: number | null,
      title: string,
      price: number,
    }
  ]
}


@Injectable({
  providedIn: 'root'
})
export class Sale_pageService {

  private readonly token :String | null=null;

  constructor(private request: ApiManagementService) {
    this.token = localStorage.getItem('token');
    this.request.setToken(this.token)
  }

  async getSale():Promise<AllSale[] | undefined>{
      return await this.request.get(`api/relation_sells/`)
  }
}
