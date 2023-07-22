import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authorizedRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
    return next.handle(authorizedRequest);
  }
}
