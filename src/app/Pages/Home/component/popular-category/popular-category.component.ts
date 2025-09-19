import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/category/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule,TranslatePipe],
  templateUrl: './popular-category.component.html',
  styleUrls: ['./popular-category.component.css']
})
export class PopularCategoryComponent implements OnInit {

 customcategoryOptions: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
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
        items: 6
      }
    },
    nav: false
  }

  categoriesList:Categories[]=[]

private readonly categories =inject(CategoriesService);
  ngOnInit() {
    this.getcategory();
  }

  getcategory():void{

    this.categories.getAllCategories().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.categoriesList=res.data;
      },
      error:(err)=>{
        // console.log(err);
      } 
     })
  }


}
