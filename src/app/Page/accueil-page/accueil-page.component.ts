import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccueilService, SearchedUser} from "./accueil.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NewSellComponent} from "../new-sell/new-sell.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NewCustomersComponent} from "../new-customers/new-customers.component";


@Component({
  selector: 'app-accueil-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NewSellComponent,
    MatButton
  ],
  templateUrl: './accueil-page.component.html',
  styleUrl: './accueil-page.component.scss'
})
export class AccueilPageComponent {

  public searchedUserResult: SearchedUser | undefined;
  public errorMsg:string="";
  private dialog = inject(MatDialog)

  constructor(private router: Router, private functionService: AccueilService) {
  }

  openDialog(): void {
    this.dialog.open(NewSellComponent, {
      width: '400px',
    }) ;
  }
  openDialog2(): void {
    this.dialog.open(NewCustomersComponent, {
      width: '400px',
      height: '60%',
    })
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
    this.router.navigate(['displaySeller']);
  }

  redirectToSale(){
    this.router.navigate(['all-sale']);
  }

}
