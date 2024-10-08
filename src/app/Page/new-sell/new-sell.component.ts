import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ServiceNewSellService} from "./service-new-sell.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {InterNewSell} from "./inter-new-sell";
import {MatOption, MatSelect} from "@angular/material/select";

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
    MatOption
  ],
  templateUrl: './new-sell.component.html',
  styleUrl: './new-sell.component.scss'
})
export class NewSellComponent implements OnInit {
  sellForm = new FormGroup({
    carModel: new FormControl('', [Validators.required]),
    customer: new FormControl('', [Validators.required]),
    option: new FormControl('')
  });

  constructor(private newSellService: ServiceNewSellService) {}

  ngOnInit(): void {}

    async onSubmit() {
      const formData: InterNewSell = {
        carModel: this.sellForm.value.carModel,
        customer: this.sellForm.value.customer,
        option: this.sellForm.value.option
      };

      try {
        const response = await this.newSellService.FuncAddCars(formData);
        console.log('Réusssi', response);
      } catch (error) {
        console.error('Erreur', error);
      }
    }
  }
