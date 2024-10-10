import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ServiceNewCustomersService } from './service-new-customers.service';
import { InterNewCustomers } from './inter-new-customers';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./new-customers.component.scss']
})
export class NewCustomersComponent implements OnInit {
  newCustomer!: FormGroup;

  constructor(
    private formRequest: FormBuilder,
    private customerService: ServiceNewCustomersService,
    private dialogRef: MatDialogRef<NewCustomersComponent>
  ) {}

  ngOnInit(): void {
    this.newCustomer = this.formRequest.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.newCustomer.valid) {
      console.log(this.newCustomer.value);
      const customerData: InterNewCustomers = this.newCustomer.value;
      try {
        const result = await this.customerService.addNewCustomer(customerData);
        console.log(result);
        this.dialogRef.close();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('pas de données');
    }
  }
}
