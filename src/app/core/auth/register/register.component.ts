import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/commponent/input/input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, InputComponent],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isloading: boolean = false
  flag: boolean = true
  MsgError: string = ''
  subscribe:Subscription=new Subscription()
  private readonly authservice = inject(AuthService)
  private readonly router = inject(Router)


  RegisterForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), Validators.required]),
    rePassword: new FormControl(null, [Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), Validators.required]),
    phone: new FormControl(null, [Validators.pattern(/^01[0125][0-9]{8}$/), Validators.required])

  }, { validators: this.conformPass })

  submit(): void {

    if (this.RegisterForm.valid) {
      this.subscribe.unsubscribe()

      this.isloading = true
      this.subscribe = this.authservice.RegiterData(this.RegisterForm.value).subscribe({
        next: (res) => {
          // console.log(res)
          // this.isloading = false
          if (res.message === 'success') {
            this.MsgError = ''
            this.router.navigate(['/login'])

          }
        }
        , error: (err) => {
          if (err.error.message ) {
            this.MsgError = err.error.message
            console.log(this.MsgError)
            this.isloading = false
          }
        }

      })

    }
    else {

      this.RegisterForm.setErrors({ missmatch: true });
      this.RegisterForm.markAllAsTouched()
    }
  }

  conformPass(group: AbstractControl) {

    // let pass = group.get('password')?.value
    // let repass = group.get('rePassword')?.value

    // if (pass === repass) {
    //   return null
    // }
    // else {
    //   return { missmatch: true }

    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null

    }
    else {
  //  group.get('rePassword')?.setErrors({ missmatch: true })
      return { missmatch: true }
    }
    // }
  }
  // create a function that adds two numbers


}


