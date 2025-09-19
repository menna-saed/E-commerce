import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Pages/cart/service/cart.service';
import { Cart } from '../../Pages/cart/models/cart';
import { TermPipe } from '../../shared/pipes/term.pipe';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [TermPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cartDetails: Cart = {} as Cart;
  private readonly cartservice = inject(CartService);
  private readonly toaster = inject(ToastrService);

  getDataCart(): void {
    this.cartservice.getDataToCart().subscribe({
      next: (res) => {
        console.log(res.data);
        
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  removeSpecifcItem(id: string): void {
    this.cartservice.removeSpecifecItemCart(id).subscribe({
      next: (res) => {
        console.log(res);
        // هنا اقدر انادي علي العرض تاني لانه كان بيعرض قبل الحذف وهو دلوقتي حذف من الداتا
        // this.getDataCart()

        this.cartservice.countNumber.set(res.numOfCartItems)

        this.toaster.success('product remove succefully','Aroma APP');

        // واقدر بما ان نفس الres هيرجع تاني بعد الحذف اقدر اعمل كدا
        // عشان الباك مرجعلك نفس شكل الداتا قبل الحذف بناقص المنتج
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
updataData(id:string,count:number):void{
  this.cartservice.UpdateCartProductQuantity(id,count).subscribe({
    next:(res)=>{
      console.log(res)
      this.getDataCart()
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
  ngOnInit(): void {
    this.getDataCart();
  }
}
