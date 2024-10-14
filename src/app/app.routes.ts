import { Routes } from '@angular/router';
import {LamdingPageComponent} from "./Page/lamding-page/lamding-page.component";
import {AccueilPageComponent} from "./Page/accueil-page/accueil-page.component";
import {DisplaySellerComponent} from "./Page/display-seller/display-seller.component";
import {SalePageComponent} from "./Page/sale-page/sale-page.component";
import {NewSellComponent} from "./Page/new-sell/new-sell.component";
import {NewCustomersComponent} from "./Page/new-customers/new-customers.component";
import {StatsConcessionComponent} from "./Page/stats-concession/stats-concession.component";

export const routes: Routes = [
  {
    path:'',
    component:LamdingPageComponent
  },
  {
    path:'accueil',
    component:AccueilPageComponent
  },
  {
    path:'displaySeller',
    component:DisplaySellerComponent
  },
  {
    path: 'all-sale',
    component: SalePageComponent
  },
  {
    path: 'all-sale/seller/:seller_id',
    component: SalePageComponent
  },
  {
    path: 'all-sale/customer/:customer_id',
    component: SalePageComponent
  },
  {
    path: 'newSell',
    component: NewSellComponent
  },
  {
    path: 'newCustomers',
    component: NewCustomersComponent
  },
  {
    path: 'statsConcession/:concession_id',
    component: StatsConcessionComponent
  },
];
