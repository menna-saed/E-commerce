import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-ChekOut',
  templateUrl: './ChekOut.component.html',
  imports: [RouterLink, ReactiveFormsModule],
  styleUrls: ['./ChekOut.component.css'],
})
export class ChekOutComponent implements OnInit {

  getID!: string | null
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly cartService = inject(CartService);

  formInput!: FormGroup;

  initForm(): void {
    this.formInput = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, Validators.required],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, Validators.required],
      }),
    });
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.getID = res.get('id')
        console.log(this.getID)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getId();
    this.initForm();
  }

  submitData(): void {
    if (this.formInput.valid) {
      console.log(this.formInput.value)
      console.log(this.getID)
      this.cartService.checkOutSession(this.getID, this.formInput.value).subscribe(
        {
          next: (res) => {
            console.log(res)
            if (res.status === 'success'){
              window.open(res.session.url,'_self')
            }

          }
          ,
          error: (err) => {
            console.log(err)
          }
        }
      )
    }
  }
}
