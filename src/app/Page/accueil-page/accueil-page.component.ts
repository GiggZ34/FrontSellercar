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
export class AccueilPageComponent implements OnInit {

  public searchedUserResult: SearchedUser | undefined;
  constructor(private router: Router, private functionService: AccueilService) {
  }

  readonly firstName = new FormControl(null);
  readonly lastName = new FormControl(null);

  ngOnInit(): void {

  }

  async searchUser(){

    this.functionService.findUserCall(this.firstName.value, this.lastName.value).then((data:SearchedUser[] | undefined)=>{
      if (!data) {
        return
      }
      this.searchedUserResult = data[0];
    })
      .catch((error)=>{
        console.log(error)
      })
  }

  redirectSellerWithId(){
    this.router.navigate(['']);
  }

  redirectToSeller(){
    this.router.navigate(['']);
  }

  redirectToSale(){
    this.router.navigate(['all-sale']);
  }

}
