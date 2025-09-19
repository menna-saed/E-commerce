import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Observable } from 'rxjs';

import { CardComponent } from '../../shared/commponent/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categorise',
  imports:[CardComponent,NgxPaginationModule,TranslatePipe],
  templateUrl: './categorise.component.html',
  styleUrls: ['./categorise.component.css']
})
export class CategoriseComponent implements OnInit {


  CategorieData:Categories[]=[]
  pageSize!:number
  p!:number
  total!:number

  private readonly category = inject(CategoriesService)

  getAllcategory() {
    this.category.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res)
        this.CategorieData =res.data
        this.pageSize=res.metadata.limit
        this.p=res.metadata.currentPage
        this.total=res.results
        console.log(this.CategorieData)

      }
      ,error(err){
        console.log(err +'menna')
      }
    })
  }

  ngOnInit() {

    this.getAllcategory();
  }

}
