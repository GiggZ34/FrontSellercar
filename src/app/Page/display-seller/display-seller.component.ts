import {Component, OnInit} from '@angular/core';
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
    MatRowDef
  ],
  templateUrl: './display-seller.component.html',
  styleUrl: './display-seller.component.scss'
})
export class DisplaySellerComponent implements  OnInit {

  public dataSource: MatTableDataSource<InterDisplaySeller> = new MatTableDataSource();
  public result :InterDisplaySeller | undefined;

  displayedColumns: string[] = ['roles', 'first_name', 'last_name', 'username', 'concession'];

constructor(private displaySellerService: ServiceDisplaySellerService) {}

  ngOnInit() {
  this.displaySellerService.FuncDisplay().then((data:InterDisplaySeller | undefined)=>{
    console.log(data)
  })
    .catch((error)=>{
      console.log(error)
    });
  }

}
