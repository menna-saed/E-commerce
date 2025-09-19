import { TermPipe } from './../../pipes/term.pipe';
import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../Pages/cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../pipes/search.pipe';
import { Console } from 'node:console';
import { Brands } from '../../../Pages/Brands/interface/brands';
import { WishlistService } from '../../../Pages/wishlist/wishlist/wishlist.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [RouterLink, CurrencyPipe, TermPipe, SearchPipe, RouterLinkActive],
})
export class CardComponent {

  isred: boolean = false
  @Input() iseven: boolean = false;

  // isredsignal: Signal<string> = computed(() => this.wishlist.isred())

  @Input({ required: true }) product: Products = {} as Products;


  private readonly cartservice = inject(CartService);
  private readonly toaster = inject(ToastrService);
  private readonly wishlist = inject(WishlistService)
  addproductToCart(id: string): void {

    this.cartservice.addToCat(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartservice.countNumber.set(res.numOfCartItems)

        console.log(this.cartservice.countNumber)
        if (res.status === 'success') {
          this.toaster.success('product add to cart successfuly', 'Aroma App');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToWishlist(id: string): void {
    this.wishlist.addToWishList(id).subscribe({
      next: (res) => {
        console.log(res)
        this.isred = !this.isred
                // this.wishlist.countNumber.set(res.count)

        if (res.status === 'success') {
          this.toaster.success('product add to cart successfuly', 'Aroma App');
        }
      }


    })
  }
}
