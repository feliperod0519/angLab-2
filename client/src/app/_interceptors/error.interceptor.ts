import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(e=>{
        if(e){
          switch (e.status){
            case 400:
              this.toastr.error("VALIDATION ERROR " + e.statusText,e.status);
              break;
            case 401:
              this.toastr.error(e.statusText,e.status);
              break;
            case 404:
              this.router.navigateByUrl('/.not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state:{error: e.error}};
              this.router.navigateByUrl('/.server-error',navigationExtras);
            default:
              this.toastr.error("Unknown error! Check the console!");
              console.log(e);
              break;
          }
        }
        return throwError(()=>new Error(e));
      })
    );
  }
}
