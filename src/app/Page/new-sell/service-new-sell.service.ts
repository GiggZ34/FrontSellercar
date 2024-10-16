import {Inject, Injectable} from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";
import {Customers, InterCarmodels, InterNewSell, InterOptions} from "./inter-new-sell";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class ServiceNewSellService {
  private readonly token : String | null = null;
  private localstorage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private document: Document,
  private request: ApiManagementService ) {
    this.localstorage = document.defaultView?.localStorage;
    if (this.localstorage) {
      this.token = this.localstorage.getItem("token");
      this.request.setToken(this.token);
    }
  }

  async FuncAddCars(body:InterNewSell):Promise<InterNewSell>{

    return await this.request.post("api/relation_sells/",body);}

  async  FuncCarModels():Promise<InterCarmodels[] | undefined>{
    const reponse: InterCarmodels[] | undefined = await this.request.get("api/car_models/");
    return reponse;
  }

  async FuncGetOption(vehicle_model: number):Promise<InterOptions[] |undefined>{
    if (!vehicle_model) return [];

    return await this.request.get(`api/option/?vehicle_model=${vehicle_model}`);
  }

  async FuncGetCustomers():Promise<Customers[] |undefined>{
    const reponse: Customers[] | undefined = await this.request.get("api/customer/ ");
    return reponse;
  }


}
