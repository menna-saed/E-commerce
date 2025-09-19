import { Spinner } from './../../../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { ProductsService } from './../../core/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { get } from 'http';
import { CardComponent } from '../../shared/commponent/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product2 } from '../cart/models/cart';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule,TranslatePipe],
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  product_list:WritableSignal<Products[]>= signal([]);
  pageSize!: number;
  p!: number;
  total!: number;
  text: string = '  ';
  private readonly productsService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);


  getData(pageNumber: number = 1) {
    this.ngxSpinnerService.show();

    this.productsService.getAllproduct(pageNumber).subscribe({
      next: (res) => {
        this.product_list.set(res.data);
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
        this.ngxSpinnerService.hide();
        console.log(this.text)
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide();


      },
    });

  }
  ngOnInit(): void {
    this.getData();

  }
}
