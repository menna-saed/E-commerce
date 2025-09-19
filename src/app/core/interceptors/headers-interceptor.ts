import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
const cookies =inject(CookieService)
if(cookies.get('token')){
   req=req.clone({
    setHeaders:{
      token:cookies.get('token')

    }
   })
}

  return next(req);
};
