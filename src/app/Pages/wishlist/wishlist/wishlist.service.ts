import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  countNumber: WritableSignal<number> = signal(0)
    // isred: WritableSignal<string> = signal('')


  private readonly httpClient = inject(HttpClient)

  addToWishList(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `wishlist`, {


      productId: id
    })
  }


  Getloggeduserwishlist(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `wishlist`)
  }


  Removeproductfromwishlist(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`)
  }
}
