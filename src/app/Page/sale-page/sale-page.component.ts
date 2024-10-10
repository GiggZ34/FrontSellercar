import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private router: Router, private functionService: Sale_pageService, private route: ActivatedRoute) {}

  public allSale : AllSale[] = [];
  public sellerFirstName: string | null = null;
  public customerFirstName: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sellerFirstName = params.get('seller_firstName');
      this.customerFirstName = params.get('customer_firstName');
      this.getSale(this.sellerFirstName, this.customerFirstName);
    });


  }

  getSale(sellerFirstName: string | null, customerFirstName: string | null) {
    this.functionService.getSale().then((data:AllSale[] | undefined)=>{
      if(data){

        if(sellerFirstName && !customerFirstName){

          data.map((item:AllSale) =>{
            if(item.seller.first_name === sellerFirstName){
              this.allSale.push(item);
            }
          })

        }else if (customerFirstName && !sellerFirstName){

          data.map((item:AllSale) =>{
            if(item.customer.first_name === customerFirstName){
              this.allSale.push(item);
            }
          })
        }else{
          this.allSale =data;
        }

      }

    })
      .catch((error)=>{
        console.log(error)
      })
  }


}
