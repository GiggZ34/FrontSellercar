import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccueilService, GetId, SearchedUser} from "./accueil.service";
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
    MatButton,
  ],
  templateUrl: './accueil-page.component.html',
  styleUrl: './accueil-page.component.scss'
})
export class AccueilPageComponent implements OnInit{

  public concession: Map<any, any> | undefined;
  public searchedUserResult: SearchedUser | undefined;
  public errorMsg:string="";
  private dialog = inject(MatDialog)


  constructor(private router: Router, private functionService: AccueilService, ) {
  }

  ngOnInit() {
    this.getId()
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

  redirectCustomerWithId(customerId : number){
    this.router.navigate([`all-sale/customer/${customerId}`]);
  }

  getId() {
    this.functionService.FuncGetIDConcession().then((data: GetId[] | undefined) => {
      if(data){
        this.concession = data.reduce((map, current) => {
          if (current.concession != null) {
            map.set(current.concession, current.concession);
          }
          return map;
        }, new Map());
      }
    })
  }

  redirectToSeller(){
    this.router.navigate(['displaySeller']);
  }

  redirectToSale(){
    this.router.navigate(['all-sale']);
  }


  redirectToStats() {
    if (this.concession) {
      this.router.navigate([`statsConcession/${this.concession.get(1)}`]);
    }
  }



  chartOptions = {
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]
  };
}
