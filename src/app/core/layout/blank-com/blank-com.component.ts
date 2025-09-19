import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/commponent/navbar/navbar.component";
import { FooterComponent } from "../../../shared/commponent/footer/footer.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-blank-com',
  templateUrl: './blank-com.component.html',
  styleUrls: ['./blank-com.component.css'],
  imports: [NavbarComponent, FooterComponent, RouterOutlet]
})
export class BlankComComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
