import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Wishlist } from './models/wishlist';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../../shared/pipes/term.pipe';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, TermPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private readonly wishlist = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  wishlistData: Wishlist[] = []

  getUserWishlist(): void {
    this.wishlist.Getloggeduserwishlist().subscribe({
      next: (res) => {
        console.log(res.data)
        this.wishlistData = res.data
      

      }
    })
  }


  removeItem(id:string): void {
    this.wishlist.Removeproductfromwishlist(id).subscribe({
      next:(res)=> {
        console.log('hi')
        console.log(res)
        this.toastrService.success('product remove succefully');
        this.getUserWishlist()
         this.wishlist.countNumber.set(res.count)

      }
    })
  }

  ngOnInit(): void {
    this.getUserWishlist()
  }


}
