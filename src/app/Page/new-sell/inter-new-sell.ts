export interface InterCarmodels {
  id: number;
  model : string;
  price : number;
}

export interface Customers {
  id: number;
  first_name : string;
  last_name : string;
  birthday : string;
}

export interface InterOptions {
  id: number;
  model : string;
  title : string;
  price : number;
}

export interface InterNewSell {
  carModel: InterCarmodels;
  customer: Customers;
  option: InterOptions;
}
