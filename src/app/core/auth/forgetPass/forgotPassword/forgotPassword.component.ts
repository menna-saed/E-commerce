import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotPassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder)

  private readonly authService = inject(AuthService)
  private readonly cookieService = inject(CookieService)
    private readonly toastrService = inject(ToastrService)

  private readonly router = inject(Router)



  verifyEmail!: FormGroup
  verifyPass!: FormGroup
  ResetPass!: FormGroup


  step: number = 1

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })


    this.verifyPass = this.fb.group({
      resetCode: [null, [Validators.required]]
    })


    this.ResetPass = this.fb.group({

      email: [null, [Validators.required, Validators.email]],


      newPassword: [null, [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]]

    })
  }

  Step1_verifyEmail(): void {
    if (this.verifyEmail.valid) {
      this.authService.verifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res)
          this.toastrService.success(res.message)
          this.step = 2
        }


      })
    }

  }

  Step2_verifyCode(): void {
    if (this.verifyPass.valid) {
      this.authService.verifyCode(this.verifyPass.value).subscribe({
        next: (res) => {
          console.log(res)
         
          this.step = 3
        }
      })
    }

  }

  Step3_newPassword(): void {
    if (this.ResetPass.valid) {
      this.authService.resetPassword(this.ResetPass.value).subscribe({
        next: (res) => {
          console.log(res)

          this.cookieService.set('token', res.token)
          this.router.navigate(['/home'])

        }
      })
    }

  }
}
