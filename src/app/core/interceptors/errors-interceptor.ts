import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

const toaster =inject(ToastrService)

  return next(req).pipe(catchError((error) => {
console.log('interceptor'+error)

toaster.error(error.error.message)
    return throwError(() => error)
  }))
};
