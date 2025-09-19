import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AllordersService {
  token!: any
  userID!: string|null
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)


  getUserorders(userID:string|null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${userID}`)
  }



}








