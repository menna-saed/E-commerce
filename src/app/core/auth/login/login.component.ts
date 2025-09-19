import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, RouterLink,TranslatePipe],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isloading: boolean = false
  subscription: Subscription = new Subscription()
  MsgError: string = ''
  private readonly authservice = inject(AuthService)
  private readonly router = inject(Router)
  private readonly service = inject(CookieService)


  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), Validators.required]),

  },)

  submit(): void {

    if (this.loginForm.valid) {

      this.subscription.unsubscribe()

      this.isloading = true
      this.authservice.loginData(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          // this.isloading = false
          if (res.message === 'success') {
            this.MsgError = ''
            this.service.set('token', res.token)

            console.log(this.authservice.decoteToken() )
            this.router.navigate(['/home'])
            console.log('res')

          }
        }
        , error: (err) => {
          if (err.error.message) {
            this.MsgError = err.error.message

            console.log(this.MsgError)
            this.isloading = false
          }
        }


      })


    }
  }



}
