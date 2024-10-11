import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ApiManagementService} from "../../Services/api-management.service";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {DOCUMENT, NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  public errorMsg:String = ""
  private localstorage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private document: Document,
              private request: ApiManagementService,
              private router: Router) {
  this.localstorage = document.defaultView?.localStorage;
  this.request.destroyToken();
  }

   sendLogin() {

     let body = {
       "username": this.email.value,
       'password': this.password.value
     }
     this.logFunc(body).then((data:User | undefined)=>{

       if (data){
         if (this.localstorage) {
           this.localstorage.setItem('token',data.token)
           this.request.setToken(data.token);
           this.router.navigate(['accueil']);
         }
       }
     })
       .catch((error)=>{
         this.errorMsg = "erreur lors de la connection, veuillez réessayer"
         console.log(error)
     })
  }

  async logFunc(body:any):Promise<User | undefined>{
   return await this.request.post("api/login/", body)
  }
}
