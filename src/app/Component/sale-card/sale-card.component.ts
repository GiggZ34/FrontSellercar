import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {AllSale} from "../../Page/sale-page/sale_page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sale-card',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './sale-card.component.html',
  styleUrl: './sale-card.component.scss'
})
export class SaleCardComponent {

  constructor(private router: Router) {
  }

  @Input() sale: AllSale | undefined;

  redirectLink(route : string, user : number){
    this.router.navigate([`all-sale/${route}/${user}`]);
  }
}
