import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccueilService, SearchedUser} from "./accueil.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-accueil-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './accueil-page.component.html',
  styleUrl: './accueil-page.component.scss'
})
export class AccueilPageComponent {

  public searchedUserResult: SearchedUser | undefined;
  public errorMsg:string="";

  constructor(private router: Router, private functionService: AccueilService) {
  }

  readonly firstName = new FormControl(null);
  readonly lastName = new FormControl(null);

  async searchUser(){

    this.functionService.findUserCall(this.firstName.value, this.lastName.value).then((data:SearchedUser[] | undefined)=>{
      if (!data) {
        return
      }

      if(data.length<1){
        this.errorMsg="No user found";
        return
      }

      this.errorMsg="";
      this.searchedUserResult = data[0];
    })
      .catch((error)=>{
        this.errorMsg="Error : " + error.error.detail;
        console.log(error)
      })
  }

  redirectCustomerWithId(firstName : String){
    this.router.navigate([`all-sale/customer/${firstName}`]);
  }

  redirectToSeller(){
    this.router.navigate(['']);
  }

  redirectToSale(){
    this.router.navigate(['all-sale']);
  }

}
