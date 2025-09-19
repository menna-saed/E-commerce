import { langService } from './../../../core/services/translate/translate.service';
import { Component, computed, inject, Input, input, PLATFORM_ID, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/auth.service';
import { CartService } from '../../../Pages/cart/service/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../Pages/wishlist/wishlist/wishlist.service';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  islang: string = 'en'
  navCount: Signal<number> = computed(() => this.cartService.countNumber())
  wishlistcount: Signal<number> = computed(() => this.wishlist.countNumber())
  Lang: Signal<string> = computed(() => this.langservice.Lang())

  @Input({ required: true }) islogin!: boolean

  private readonly auth = inject(AuthService)
  private readonly id = inject(PLATFORM_ID)
  private readonly wishlist = inject(WishlistService)

  private readonly cartService = inject(CartService)
  langservice = inject(langService)

  constructor(private flowbiteService: FlowbiteService) { }



  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {

      // this.getCountNumber()

      initFlowbite();

      if (isPlatformBrowser(this.id)) {
        this.getCountCart()
        this.getcountwishlist()
      }


    });



  }
  // getCountNumber(): void {
  //   this.cartService.countNumber.subscribe({
  //     next: (value) => {
  //       this.navCount = value
  //     }
  //   })

  // }


  getcountwishlist(): void {
    this.wishlist.Getloggeduserwishlist().subscribe({
      next: (value) => {
        console.log(value)
        this.wishlist.countNumber.set(value.count)

      }
    })
  }
  getCountCart(): void {
    this.cartService.getDataToCart().subscribe({
      next: (value) => {
        console.log(value)
        this.cartService.countNumber.set(value.numOfCartItems)

      }
    })
  }



  islogout(): void {
    this.auth.logout()
  }

}
