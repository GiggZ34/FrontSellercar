import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CheckConnexionService {

  constructor( private router: Router) { }

  checkConnexion(){
    if(!localStorage.getItem("token")){
      this.router.navigate(['/']);
    }
  }
}
