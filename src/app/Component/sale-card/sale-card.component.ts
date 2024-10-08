import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {AllSale} from "../../Page/sale-page/sale_page.service";

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

  @Input() sale: AllSale | undefined;
}
