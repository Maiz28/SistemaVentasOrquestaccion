import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  let countRequest = 0;

  spinner.show();

  countRequest++;

  return next(req).pipe(
    finalize(() => {
      countRequest--;
      if (!countRequest) {
        spinner.hide();
      }
    })
  );
};

// @Injectable({ providedIn: 'root' })
// export class LoadingInterceptor implements HttpInterceptor {
//   private countRequest = 0;
//   constructor(private spinner: NgxSpinnerService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     this.spinner.show();
//     console.log('Loading: Interceptor');
//     this.countRequest++;
//     return next.handle(req).pipe(
//       finalize(() => {
//         this.countRequest--;
//         if (!this.countRequest) {
//           this.spinner.hide();
//         }
//       })
//     );
//   }
// }
