import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/commponent/card/card.component';
import { ProductsService } from '../../../../core/services/products.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.css'],
  imports: [CardComponent,TranslatePipe],
})
export class PopularProductComponent implements OnInit {
  productList: Products[] = [];

  private readonly products = inject(ProductsService);

  ngOnInit() {
    this.getproduct();
  }

  getproduct(pageNumber: number = 1): void {
    this.products.getAllproduct(pageNumber).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.productList = res.data;
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
