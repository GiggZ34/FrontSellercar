import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceDisplaySellerService} from "./service-display-seller.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {InterDisplaySeller} from "./inter-display-seller";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";


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
    MatButton
  ],
  templateUrl: './display-seller.component.html',
  styleUrl: './display-seller.component.scss'
})
export class DisplaySellerComponent implements  OnInit {

  public dataSource: MatTableDataSource<InterDisplaySeller> = new MatTableDataSource();

  displayedColumns: string[] = ['roles', 'first_name', 'last_name', 'username', 'concession'];

  @ViewChild(MatTable) table!: MatTable<any>;

constructor(private displaySellerService: ServiceDisplaySellerService, private router: Router) { }

  ngOnInit() {
  this.displaySellerService.FuncDisplay().then((data:InterDisplaySeller[] | undefined)=>{
    if(data) {
      console.log('donnée récupérées',data);
      this.dataSource.data = data;
    }

    this.table.renderRows();

  })
    .catch((error)=>{
      console.log('Erreur',error)
    });
  }

  redirection(row:InterDisplaySeller ){
    console.log("toto",row)

    this.router.navigate([`all-sale/seller/${row.first_name}`]);
  }

  Return(){
  this.router.navigate(['accueil']);
  }
}
