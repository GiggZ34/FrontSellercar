import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  AllSale, AllSalePagination,
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
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sale-page',
  standalone: true,
  imports: [
    SaleCardComponent,
    CanvasJSAngularChartsModule,
    MatButton,
    FormsModule,
    NgClass
  ],
  templateUrl: './sale-page.component.html',
  styleUrl: './sale-page.component.scss'
})
export class SalePageComponent implements OnInit {

  constructor(private router: Router,
              private functionService: Sale_pageService,
              private route: ActivatedRoute,
              private connexion : CheckConnexionService ) {}

  public allSale: AllSalePagination<AllSale> = {
    count: 0,
    total_pages:0,
    next: null,
    previous: null,
    results: []
  };

  public actualPage:number = 1;
  public totalPages: number[] = Array(2);

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
      this.getSale();
    });
    this.connexion.checkConnexion()
  }

  getSale() {
    this.functionService.getSale(this.sortCriteria, this.actualPage, this.sellerId, this.customerId).then((data:AllSalePagination<AllSale>  | undefined)=>{
      console.log(data)
      if(data){
        this.allSale = data;
        this.totalPages = Array.from({ length: data.total_pages }, (_, i) => i + 1);
        if(this.sellerId){
          this.getUserStat()
        }
      }

    })
      .catch((error)=>{
        console.log('Erreur',error)
      });
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
            { label: `${this.allSale.results[0].seller.first_name} ${this.allSale.results[0].seller.last_name} Sales`,
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
            { label: `${this.allSale.results[0].seller.first_name} ${this.allSale.results[0].seller.last_name} Sales`,
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

  goToPage(page: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.actualPage = page;
    this.getSale()
  }

}
