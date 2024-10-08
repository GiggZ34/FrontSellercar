import { Injectable } from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";
import {InterNewSell} from "./inter-new-sell";

@Injectable({
  providedIn: 'root'
})
export class ServiceNewSellService {

  constructor(private request: ApiManagementService ) { }



  async FuncAddCars(body:InterNewSell):Promise<InterNewSell | undefined>{
    return await this.request.post("api/relation_sells/",body);}


}
