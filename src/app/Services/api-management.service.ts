import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ParamsService} from "./params.service";

export type queryParams = { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> }

@Injectable({
  providedIn: 'root'
})

export class ApiManagementService {

  private _token: String | null = null;

  constructor(private _http: HttpClient, private paramsService: ParamsService) {
  }

  setToken(token: String | null) {
    if(!token){
      return
    }
    this._token = token;
  }

  getToken() {
    return this._token;
  }

  async get<T>(path: string,
               options: {
                 params?: queryParams,
                 error_message?: string,
                 call_without_token?: boolean,
                 force?: boolean
               } = {}): Promise<T | undefined> {

    const headers = new HttpHeaders({
      ...(options.call_without_token ? {} : { Authorization: `Token ${this._token}` })
    });

    return lastValueFrom(
      this._http.get<HttpResponse<T>>(
        this.paramsService.url_api + path,
        {
          withCredentials: true,
          headers:headers,
          params: options.params
        }
      )
    ) as Promise<T>;
  }

  async post<T, R = T>(path: string, body: T,
                       options: {
                         params?: queryParams,
                         error_message?: string,
                         call_without_token?: boolean,
                         force?: boolean
                       } = {}): Promise<R> {

    return lastValueFrom(
      this._http.post<HttpResponse<T>>(
        this.paramsService.url_api + path,
        body,
        {
          withCredentials: true,
          params: options.params
        }
      )
    ) as Promise<R>;
  }
  async patch<T, R = T>(path: string, body: T,
                        options: {
                          params?: queryParams,
                          error_message?: string,
                          call_without_token?: boolean,
                          force?: boolean
                        } = {}): Promise<R> {

    return lastValueFrom(
      this._http.patch<HttpResponse<T>>(
        this.paramsService.url_api + path,
        body,
        {
          withCredentials: true,
          params: options.params
        }
      )
    ) as Promise<R>;
  }

  async delete<T, R = T>(path: string,
                         options: {
                           params?: queryParams,
                           error_message?: string,
                           call_without_token?: boolean,
                           force?: boolean
                         } = {}): Promise<R> {

    return lastValueFrom(
      this._http.delete<HttpResponse<T>>(
        this.paramsService.url_api + path,
        {
          withCredentials: true,
          params: options.params
        }
      )
    ) as Promise<R>;
  }
}
