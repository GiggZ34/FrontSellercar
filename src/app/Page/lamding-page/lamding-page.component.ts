import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {merge} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

interface User{
  token: string,
  user: {
    roles: string,
    first_name: string,
    last_name: string,
    username: string,
    concession: number
  }
}

@Component({
  selector: 'app-lamding-page',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIcon, MatIconButton, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lamding-page.component.html',
  styleUrl: './lamding-page.component.scss',
})
export class LamdingPageComponent  {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor(private request: ApiManagementService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

   sendLogin() {

     let body = {
       "username": this.email.value,
       'password': this.password.value
     }
     console.log('toto')
     this.testFunc(body).then((data:User | undefined)=>{

       if (data){
         console.log(data.token)

         localStorage.setItem('token',data.token)
       }
     })
       .catch((error)=>{
       console.log(error)
     })
  }

  async testFunc(body:any):Promise<User | undefined>{

   return await this.request.post("api/login/", body)
  }
}
