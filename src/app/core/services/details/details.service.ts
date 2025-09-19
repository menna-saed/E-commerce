import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CartService } from '../../../Pages/cart/service/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {

  token!: any
  private readonly httpClient = inject(HttpClient);
  private readonly cartservice = inject(CartService);
  private readonly cookieService = inject(CookieService);

  getToken(): void {
    this.token = this.cookieService.get('token')
  }


  getDetails(productId: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products/${productId}`,
    
    );
  }





}
