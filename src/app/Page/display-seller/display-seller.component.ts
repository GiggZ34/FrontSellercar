import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AllUserStatInterface,
  ChartOptionsInterface,
  InterDisplaySeller,
  ServiceDisplaySellerService
} from "./service-display-seller.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {CheckConnexionService} from "../../Services/check-connexion.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-display-seller',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    CanvasJSAngularChartsModule,
    MatSort,
    MatSortHeader,
    NgIf
  ],
  templateUrl: './display-seller.component.html',
  styleUrl: './display-seller.component.scss'
})
export class DisplaySellerComponent implements  OnInit {

  public dataSource: MatTableDataSource<InterDisplaySeller> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'roles', 'first_name', 'last_name', 'username', 'concession'];

  counters: { [key: string]: number } = {
    id: 0,
    roles: 0,
    first_name: 0,
    last_name: 0,
    username: 0,
    concession: 0,
  };


  @ViewChild(MatSort) sort!: MatSort;

  chartOptions: ChartOptionsInterface = {
    title: {
      text: "ALL SELLER STAT"
    },
    data: [{
      type: "column",
      dataPoints: []
    }]
  };

constructor(private displaySellerService: ServiceDisplaySellerService,
            private router: Router,
            private connexion : CheckConnexionService ) { }

  ngOnInit() {
    this.SortUser()
    this.getAllUserStat()
    this.connexion.checkConnexion()
  }

 async SortUser() {
      const data = await this.displaySellerService.FuncDisplay(null);

      if(data) {
        this.dataSource.data = data;
      }
    }


  redirection(row:InterDisplaySeller ){
    //this.router.navigate([`all-sale/seller/${row.id}`]);
  }

  Return(){
  this.router.navigate(['accueil']);
  }

  getAllUserStat(){
    this.displaySellerService.getAllUserStat().then((data:AllUserStatInterface[] | undefined)=>{
      this.setChartPoint(data)
    })
      .catch((error)=>{
        console.log('Erreur',error)
      });
  }

  setChartPoint(allUserStat: AllUserStatInterface[] | undefined) {
    this.chartOptions = {
      title: {
        text: "ALL SELLER STAT"
      },
      data: [{
        type: "column",
        dataPoints: allUserStat ? allUserStat.map(user => ({
          label: `${user.first_name} ${user.last_name}`,
          y: user.total_sales
        })) : []
      }]
    };
  }

  async Order(input: string) {
    const validInputs = ["id", "roles", "first_name", "last_name", "username", "concession"];

    if (validInputs.includes(input)) {
      const actions = [
        async () => await this.displaySellerService.FuncDisplay(input),
        async () => await this.displaySellerService.FuncDisplay("-" + input),
        async () => await this.displaySellerService.FuncDisplay(null),
      ];

      const data = await actions[this.counters[input]]();

      this.counters[input] = (this.counters[input] + 1) % actions.length;

      if (data) {
        this.dataSource.data = data;
      }
    }
  }


}
