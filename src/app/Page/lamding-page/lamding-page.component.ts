import {Component, OnInit} from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";

@Component({
  selector: 'app-lamding-page',
  standalone: true,
  imports: [],
  templateUrl: './lamding-page.component.html',
  styleUrl: './lamding-page.component.scss'
})
export class LamdingPageComponent implements OnInit {

  constructor(private request: ApiManagementService) {
  }

  ngOnInit() {
    this.request.get("api/car_models/").then(data => {
      console.log(data);
    },
    error=>{
      console.log(error)
    }
    )
  }
}
