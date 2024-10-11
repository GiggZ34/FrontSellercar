import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "./Services/request-interceptor.service";
import {BrowserModule} from "@angular/platform-browser";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    CanvasJSAngularChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
})
export class AppModule {


}
