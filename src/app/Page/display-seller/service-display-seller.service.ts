import {Inject, Injectable} from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";
import {DOCUMENT} from "@angular/common";

export interface AllUserStatInterface {
  id: number,
  first_name: string,
  last_name: string,
  concession: number,
  number_sale_model: number,
  number_sale_option: number,
  percent_sales_total: number,
  percent_sales_concession: number,
  avg_option_per_car: number,
  total_sales: number
}

export interface ChartOptionsInterface {
  title: {
    text: string;
  };
  data: Array<{
    type: string;
    dataPoints: Array<{
      label: string;
      y: number;
    }>;
  }>;
}

export interface InterDisplaySeller {
  id: number
  roles: string
  first_name: string
  last_name: string
  username: string
  concession: number
}


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


  async FuncDisplay(ordering:string | null):Promise<InterDisplaySeller[] | undefined>{
    if(ordering){
      return await this.request.get(`api/seller/?ordering=${ordering}`);
    }else{
      return await this.request.get("api/seller/");
    }

  }

  async getAllUserStat():Promise<AllUserStatInterface[] | undefined>{
    return await this.request.get("api/stat_seller/");
  }

}
