import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, tap, throwError } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private refreshTokenInProgress = false;
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private httpClient: HttpClient,
  ) { }

  refreshToken(): Observable<any> {
    console.log("REFRESHING TOKEN")
    if (this.refreshTokenInProgress) {
      return this.accessTokenSubject.asObservable();
    } else {
      this.refreshTokenInProgress = true;

      return this.httpClient.post<any>(localStorage.getItem('backend_url') +
        '/api/token/refresh/',
        {
          refresh_token: localStorage.getItem("refresh_token"),
        },
        { withCredentials: true }).pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
        })
      );
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ withCredentials: true, headers: req.headers.set('Content-Type', 'application/json') })).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      })
    );
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log("401 ERROR")
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(true);
          return next.handle(request.clone({ withCredentials: true }));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next.handle(request.clone({ withCredentials: true })))
      );
    }
  }
}
