import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from "../../shared/commponent/card/card.component";
import { CategoriseComponent } from "../categorise/categorise.component";
import { MainSliderComponent } from "./component/main-slider/main-slider.component";
import { PopularProductComponent } from "./component/popular-product/popular-product.component";
import { PopularCategoryComponent } from "./component/popular-category/popular-category.component";
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [CardComponent, CategoriseComponent, MainSliderComponent, PopularProductComponent, PopularCategoryComponent]
})
export class HomeComponent  {

}
