import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccueilService, GeneralStat, GetId, SearchedUser} from "./accueil.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NewSellComponent} from "../new-sell/new-sell.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NewCustomersComponent} from "../new-customers/new-customers.component";
import {CheckConnexionService} from "../../Services/check-connexion.service";


@Component({
  selector: 'app-accueil-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NewSellComponent,
    MatButton,
    FormsModule,
    NgForOf,
  ],
  templateUrl: './accueil-page.component.html',
  styleUrl: './accueil-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccueilPageComponent implements OnInit{

  concession: Map<number, number> | undefined;
  selectedConcession: number | null = null;
  public searchedUserResult: SearchedUser | undefined;
  public errorMsg:string="";
  private dialog = inject(MatDialog)
  public generalStat : GeneralStat | undefined;


  constructor(private router: Router,
              private functionService: AccueilService,
              private connexion : CheckConnexionService,private cdRef: ChangeDetectorRef ) {
  }

  ngOnInit() {
    this.getId();
    this.connexion.checkConnexion();
    this.getGeneralStat();
  }

  openDialog(): void {
    this.dialog.open(NewSellComponent, {

    }) ;
  }
  openDialog2(): void {
    this.dialog.open(NewCustomersComponent, {

    })
  }

  getGeneralStat(){
    this.functionService.getGeneralStat().then((data: GeneralStat | undefined) => {
      if(data){
       this.generalStat = data
      }
      this.cdRef.markForCheck();
    });
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
      if (data) {
        this.concession = data.reduce((map, current) => {
          if (current.concession != null) {
            map.set(current.concession, current.concession);
          }
          return map;
        }, new Map());
        this.cdRef.markForCheck();
      }
    });
  }

  redirectToSeller(){
    this.router.navigate(['displaySeller']);
  }

  redirectToSale(){
    this.router.navigate(['all-sale']);
  }


  redirectToStats() {
    if (this.selectedConcession !== null) {
      this.router.navigate([`statsConcession/${this.selectedConcession}`]);
    }
  }

  redirectSeller(id:number){
    this.router.navigate([`all-sale/seller/${id}`]);
  }
}
