import { Routes } from '@angular/router';
import {LamdingPageComponent} from "./Page/lamding-page/lamding-page.component";
import {AccueilPageComponent} from "./Page/accueil-page/accueil-page.component";
import {SalePageComponent} from "./Page/sale-page/sale-page.component";

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
    path:'all-sale',
    component:SalePageComponent
  },

];
