import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!:any

private readonly httpclient =inject(HttpClient)
private readonly cookies =inject(CookieService)
private readonly router =inject(Router)



RegiterData(data:object):Observable<any>{
 return this.httpclient.post( environment.baseUrl +'auth/signup' ,data)
}

loginData(data:object):Observable<any>{
 return this.httpclient.post( environment.baseUrl +'auth/signin' ,data)
}

logout():void{
  this.cookies.delete('token')
  this.router.navigate(['/login'])


}

decoteToken(){

try{
  this.token =   jwtDecode(this.cookies.get('token'))

}
catch{
  this.logout()
}
return this.token
}


verifyEmail(data:object):Observable<any>{
  return this.httpclient.post(environment.baseUrl+`auth/forgotPasswords`,data)
}

verifyCode(data:object):Observable<any>{
  return this.httpclient.post(environment.baseUrl+`auth/verifyResetCode`,data)
}
resetPassword(data:object):Observable<any>{
  return this.httpclient.put(environment.baseUrl+`auth/resetPassword`,data)
}
}
