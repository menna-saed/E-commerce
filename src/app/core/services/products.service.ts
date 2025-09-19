import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private readonly httpclient = inject(HttpClient);
getAllproduct(pageNum:number =1):Observable<any>{
  return this.httpclient.get( environment.baseUrl + `products?page=${pageNum}`);
}

}
