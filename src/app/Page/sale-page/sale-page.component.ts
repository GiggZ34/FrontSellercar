import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  AllSale,
  PieChartOptions,
  Sale_pageService, SortCriteriaInterface,
  StackedColumnChartOptions,
  UserStatInterface
} from "./sale_page.service";
import {SaleCardComponent} from "../../Component/sale-card/sale-card.component";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {MatButton} from "@angular/material/button";
import {CheckConnexionService} from "../../Services/check-connexion.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sale-page',
  standalone: true,
  imports: [
    SaleCardComponent,
    CanvasJSAngularChartsModule,
    MatButton,
    FormsModule
  ],
  templateUrl: './sale-page.component.html',
  styleUrl: './sale-page.component.scss'
})
export class SalePageComponent implements OnInit {

  constructor(private router: Router,
              private functionService: Sale_pageService,
              private route: ActivatedRoute,
              private connexion : CheckConnexionService ) {}

  public allSale : AllSale[] = [];
  public sellerId: number | null = null;
  public customerId: number | null = null;

   public sortCriteria: SortCriteriaInterface = {
     total_price:  null,
     total_options_price: null,
     id: null,
     customer__first_name:  null,
     seller__first_name:  null
    };

  //GRAPH
  chartPieConcession: PieChartOptions = {
    title: { text: "Répartition des Ventes dans sa concession" },
    animationEnabled: true,
    data: [{
      type: "pie",
      dataPoints: [
        { label: "", y: 0 },
        { label: "", y: 0 }
      ]
    }]
  };

  chartPieTotal: PieChartOptions = {
    title: { text: "Répartition de ses Ventes sur toute les concession" },
    animationEnabled: true,
    data: [{
      type: "pie",
      dataPoints: [
        { label: "", y: 0 },
        { label: "", y: 0 }
      ]
    }]
  };

  stackedChartOptions: StackedColumnChartOptions = {
    title: {text: "Nombre d'Options Vendues par rapport aux Modèles"},
    animationEnabled: true,
    axisY: {
      labelFormatter: () => "",
      gridThickness: 0,
      lineThickness: 0,
      tickLength: 0
    },
    data: [{
      type: "",
        dataPoints: [
          {
          label: ``,
          y: 0
        },
        {
          label: ``,
          y: 0
        },
      ]
    }]
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sellerId = parseInt(<string>params.get('seller_id')) ;
      this.customerId = parseInt(<string>params.get('customer_id'));
      this.getSale(this.sellerId, this.customerId);
    });
    this.connexion.checkConnexion()



  }

  getSale(sellerFirstName: number | null, customerFirstName: number | null) {
    this.functionService.getSale(this.sortCriteria).then((data:AllSale[] | undefined)=>{
      if(data){
        if(sellerFirstName && !customerFirstName){

          this.getUserStat()

          data.map((item:AllSale) =>{
            if(item.seller.id === sellerFirstName){
              this.allSale.push(item);
            }
          })

        }else if (customerFirstName && !sellerFirstName){

          data.map((item:AllSale) =>{
            if(item.customer.id === customerFirstName){
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

  getUserStat(){
    this.functionService.getUserStat(this.sellerId).then((data:UserStatInterface | undefined)=>{
      this.setGraph(data)
    })
      .catch((error)=>{
        console.log('Erreur',error)
      });
  }

  setGraph(sellerData : UserStatInterface | undefined){

    if(sellerData){



      this.stackedChartOptions = {
        title: { text: "Number of Options and Cars Sold" },
        animationEnabled: true,
        axisY: {
          labelFormatter: () => "",
          gridThickness: 0,
          lineThickness: 0,
          tickLength: 0
        },
        data: [{
          type: "column",
          dataPoints: [
            {
              label: `Total Car Sales`,
              y: sellerData.number_sale_model
            },
            {
              label: `Total Options Sales`,
              y: sellerData.number_sale_option
            }
          ]
        }]
      };

      this.chartPieConcession = {
        title: { text: "Total Sales Distribution" },
        animationEnabled: true,
        data: [{
          type: "pie",
          dataPoints: [
            { label: `${this.allSale[0].seller.first_name} ${this.allSale[0].seller.last_name} Sales`,
              y: sellerData.percent_sales_concession },
            { label: "Total Concession Sales", y: 100 - sellerData.percent_sales_concession }
          ]
        }]
      };

      this.chartPieTotal = {
        title: { text: "Sales Distribution In Concession" },
        animationEnabled: true,
        data: [{
          type: "pie",
          dataPoints: [
            { label: `${this.allSale[0].seller.first_name} ${this.allSale[0].seller.last_name} Sales`,
              y: sellerData.percent_sales_total },
            { label: "Total Sales", y: 100 - sellerData.percent_sales_total }
          ]
        }]
      };
    }
  }

  Return(){
    this.router.navigate(['accueil']);
  }

   applyFilter() {

     this.functionService.getSale(this.sortCriteria).then((data:AllSale[] | undefined)=>{

       if(!data){
         return
       }

       this.allSale = [];

       if(this.sellerId && !this.customerId){

         this.getUserStat()

         data.map((item:AllSale) =>{
           if(item.seller.id === this.sellerId){
             this.allSale.push(item);
           }
         })

       }else if (this.customerId && !this.sellerId){

         data.map((item:AllSale) =>{
           if(item.customer.id === this.customerId){
             this.allSale.push(item);
           }
         })
       }else{
         this.allSale =data;
       }

     })
       .catch((error)=>{
         console.log('Erreur',error)
       });
  }

}
