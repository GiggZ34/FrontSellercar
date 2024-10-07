import { Routes } from '@angular/router';
import {LamdingPageComponent} from "./Page/lamding-page/lamding-page.component";
import {AccueilPageComponent} from "./Page/accueil-page/accueil-page.component";
import {DisplaySellerComponent} from "./Page/display-seller/display-seller.component";

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

];
