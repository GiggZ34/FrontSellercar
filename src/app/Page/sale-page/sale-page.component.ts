import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AllSale, Sale_pageService} from "./sale_page.service";
import {SaleCardComponent} from "../../Component/sale-card/sale-card.component";

@Component({
  selector: 'app-sale-page',
  standalone: true,
  imports: [
    SaleCardComponent
  ],
  templateUrl: './sale-page.component.html',
  styleUrl: './sale-page.component.scss'
})
export class SalePageComponent implements OnInit {

  constructor(private router: Router, private functionService: Sale_pageService) {}

  public allSale : AllSale[] | undefined= [];

  ngOnInit() {
    this.functionService.getSale().then((data:AllSale[] | undefined)=>{
      this.allSale = data;
    })
      .catch((error)=>{
        console.log(error)
      })
  }
}
