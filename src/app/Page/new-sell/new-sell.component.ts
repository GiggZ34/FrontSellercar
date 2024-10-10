import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ServiceNewSellService} from "./service-new-sell.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Customers, InterCarmodels, InterNewSell, InterOptions} from "./inter-new-sell";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-sell',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './new-sell.component.html',
  styleUrl: './new-sell.component.scss'
})
export class NewSellComponent implements OnInit {
    sellForm : FormGroup;
    carModels: InterCarmodels[] = [];
    customer: Customers[] = [];
    options: InterOptions[] = [];

  constructor(private sell: FormBuilder,private newSellService: ServiceNewSellService,
              private dialogRef: MatDialogRef<NewSellComponent>  ) {
    this.sellForm = this.sell.group({
      carmodel: [],
      customer: [],
      options: []
    });
  }

  ngOnInit(): void {

    this.loadCarModels().then();
    this.loadOptions().then();
    this.loadCustomers().then();
  }


  async loadCarModels(){
    try{
      const models = await this.newSellService.FuncCarModels();
      if(models) {
        this.carModels = models;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async loadOptions() {
    try {
      const options = await this.newSellService.FuncGetOption();
      if (options) {
        this.options = options;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async loadCustomers(){
    try{
      const customers = await this.newSellService.FuncGetCustomers();
      if(customers){
        this.customer = customers;
      }
    } catch (error){
      console.error(error);
    }
  }

  async onSubmit() {
    console.log(this.sellForm.value);
    if (this.sellForm.valid) {
      const formData: InterNewSell = this.sellForm.value;
      console.log(formData)
      try {
        const response = await this.newSellService.FuncAddCars(formData);
        console.log(response);
        this.dialogRef.close();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('pas valide');
    }
  }

  // SELECTION MULTIPLE SUR SELECT OPTIONS

  onOptionChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const options: string[] = this.sellForm.get('options')?.value || [];

    if (checkbox.checked) {
      options.push(checkbox.value);
    } else {
      const index = options.indexOf(checkbox.value);
      if (index > -1) {
        options.splice(index, 1);
      }
    }
    this.sellForm.patchValue({ options });
  }
}


