import { Routes } from '@angular/router';
import {LamdingPageComponent} from "./Page/lamding-page/lamding-page.component";
import {AccueilPageComponent} from "./Page/accueil-page/accueil-page.component";

export const routes: Routes = [
  {
    path:'',
    component:LamdingPageComponent
  },
  {
    path:'accueil',
    component:AccueilPageComponent
  }

];
