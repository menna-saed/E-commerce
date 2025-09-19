import { Component, Input, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports:[ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() control: any;
  @Input() idInput!: string
  @Input() typenput!: string

  @Input() labelInput!: string



}
