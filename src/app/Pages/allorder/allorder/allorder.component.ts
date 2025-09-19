import { CartItem } from './../../../core/models/orders';
import { Component, inject, OnInit } from '@angular/core';
import { AllordersService } from './allorders.service';
import { CookieService } from 'ngx-cookie-service';
import { get } from 'http';
import { orders } from '../../../core/models/orders';
import { Orders2 } from '../../../core/models/orders2';
import { jwtDecode } from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  imports:[DatePipe,TranslatePipe],
  styleUrls: ['./allorder.component.css']
})
export class AllorderComponent implements OnInit  {
  token!: any
  userID!: string
  OrderList: orders[] = []
  private readonly allorders = inject(AllordersService)
  private readonly cookieService = inject(CookieService)




  getUserOrders(): void {

    this.allorders.getUserorders(this.userID).subscribe({
      next: (res) => {

        this.OrderList = res
        console.log(this.OrderList)
      },

    })
  }


  decodeToken() {

    try {
      this.token = jwtDecode(this.cookieService.get('token'))
      this.userID = this.token.id
      console.log(this.userID)
      this.getUserOrders()
    }
    catch (error) {
      console.log('error in token' + error)

    }

    return this.userID

  }

ngOnInit(): void {
  this.decodeToken()
}

}


