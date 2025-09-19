import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { routes } from '../../app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(CookieService)
  const router =inject(Router)
  if (service.get('token')) {
    return true;

  }
  else {
// كدا يضرب ايرور علي السيرفر
    // router.navigate(['/login'])
    // return false
    // دا الصح كدا اختصر السطرين في شطر واحد منع من الهوم ودخل ف الlogin
    return router.parseUrl('/login')

  }
};
