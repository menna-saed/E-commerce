import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './service/Brands.service';
import { get } from 'http';
import { Brands } from './interface/brands';
import { CardComponent } from "../../shared/commponent/card/card.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-Brands',
  templateUrl: './Brands.component.html',
  styleUrls: ['./Brands.component.css'],
  imports: [CardComponent,TranslatePipe]
})
export class BrandsComponent implements OnInit {
Databrand:Brands[] =[] as Brands[]
 private readonly brands =inject(BrandsService)


 getbrands():void{
  this.brands.getBrands().subscribe({
    next:(res)=>{
      console.log(res.data)

      this.Databrand=res.data
      console.log(this.Databrand)
    }
  })

 }
  ngOnInit() {
    this.getbrands()
  }

}
