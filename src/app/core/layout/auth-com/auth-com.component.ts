import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/commponent/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-com',
  templateUrl: './auth-com.component.html',
  styleUrls: ['./auth-com.component.css'],
  imports: [NavbarComponent, RouterOutlet]
})
export class AuthComComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
