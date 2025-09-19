
import { Component, inject, OnInit } from '@angular/core';
import { DetailsService } from '../../core/services/details/details.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Details',
  imports: [CarouselModule],
  templateUrl: './Details.component.html',
  styleUrls: ['./Details.component.css']
})
export class DetailsComponent implements OnInit {
  produtId!: string | null;
  Pdata: Products = {} as Products;
  productImg: string[] = [];

  private readonly detailsproduct = inject(DetailsService);
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly cartservice = inject(CartService);
  private readonly toastrService = inject(ToastrService);




  getId(): void {
    this.activateRoute.paramMap.subscribe({
      next: (res) => {

        this.produtId = res.get('id');
        console.log(this.produtId);
      }
      , error: (err) => console.log(err)
    })
  }

  getDetailsProduct(): void {
    this.detailsproduct.getDetails(this.produtId).subscribe({
      next: (res) => {
        this.Pdata = res.data
        console.log(this.Pdata)
        this.productImg = res.data.images

        // console.log(this.productImg);
      }
      , error: (err) => console.log(err)
    })
  }


  ngOnInit(): void {
    this.getId();
    this.getDetailsProduct();


  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  addProductTocart(id: string): void {
    this.cartservice.addToCat(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('product add to cart successfully')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
