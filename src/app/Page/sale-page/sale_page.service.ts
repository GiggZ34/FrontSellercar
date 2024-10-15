import {Injectable, OnInit} from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";

export interface AllSale {
  id: number,
  seller: {
    id: number,
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
    id:number,
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
  total_price:number,
  total_options_price:number
}

export interface UserStatInterface {
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

export interface PieChartOptions {
  title: { text: string; };
  animationEnabled: boolean,
  data: Array<{
    type: string;
    dataPoints: Array<{
      label: string;
      y: number;
    }>;
  }>;
}

export interface SortCriteriaInterface {
  total_price: string | null,
  total_options_price: string | null,
  id: string | null,
  customer__first_name: string | null,
  seller__first_name: string | null
}

export interface StackedColumnChartOptions {
  title: { text: string; };
  animationEnabled: boolean,
  axisY: {
    labelFormatter: () => string;
    gridThickness: number;
    lineThickness: number;
    tickLength: number;
  };
  data: Array<{
    type: string;
    dataPoints: Array<{
      label: string;
      y: number;
    }>;
  }>;
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

  async getSale(sortCriteria: SortCriteriaInterface): Promise<AllSale[] | undefined> {
    let orderingParams = [];

    for (const [key, value] of Object.entries(sortCriteria)) {
      if (value === '') {
        // Tri croissant
        orderingParams.push(key);
      } else if (value === '-') {
        // Tri décroissant
        orderingParams.push(`-${key}`);
      }
    }

    const orderingQuery = orderingParams.length > 0 ? `?ordering=${orderingParams.join(',')}` : '';
    return await this.request.get(`api/relation_sells/${orderingQuery}`);
  }

  async getUserStat(userId: number | null):Promise<UserStatInterface | undefined>{
    return await this.request.get(`api/stat_seller/${userId}`);
  }
}
