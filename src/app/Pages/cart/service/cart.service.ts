import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpclient = inject(HttpClient);
  private readonly cookies = inject(CookieService);
  // myheader: object = {
  //   headers: {
  //     token: this.cookies.get('token'),
  //   },
  // };

  
  countNumber:WritableSignal<number> =signal(0)

  addToCat(id: string): Observable<any> {
    return this.httpclient.post(
      environment.baseUrl + 'cart',

      {
        productId: id,
      },
      // this.myheader
    );
  }

  getDataToCart(): Observable<any> {
    return this.httpclient.get(environment.baseUrl + 'cart',);
  }

  removeSpecifecItemCart(id: string): Observable<any> {
    return this.httpclient.delete(
      environment.baseUrl + `cart/${id}`,

      
    );
  }
  UpdateCartProductQuantity(id: string,count:number): Observable<any> {
    return this.httpclient.put(environment.baseUrl + `cart/${id}`, 
      {
      count: count,
      }
     ,
    
    
 ) ;
}


checkOutSession(id:string|null,data:object):Observable<any>{
  return this.httpclient.post(environment.baseUrl+`orders/checkout-session/${id}?url=http://localhost:4200`,data,)
}
}
