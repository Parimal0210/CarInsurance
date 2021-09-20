import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { _getOptionScrollPosition } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
loginForm : FormGroup | any
loginData = {}
val : any
otp : any

  constructor(private auth: AuthenticationService,private router: Router) {

    }

  ngOnInit(): void {
    this.getLoginData()
  }
getLoginData(){
  this.auth.current__applicantData.subscribe(
      (response: any) => {
        if (response == null) {

        } else {
          this.val = response.emailOrMobile;
          console.log(" data ", this.val );

        }
      },
      (error: any) => {

      },
      () => { }
    )

}
login_now(loginForm : NgForm){
//debugger;
let val1 = this.otp
console.log("Value = "+val1);
   const data = {
  emailOrMobile: this.val,
  otpCode : val1,
  type: 'Registration'
  };
console.log("Data in OTP = "+data)
//console.log(loginForm.value)
    this.auth.enter_otp(data).subscribe(
      res => {
                console.log("Data = "+res)
                this.router.navigate(['/info-cards']);
       } ,
      err => console.log("something went wrong = "+err)
    )

  }

  Goback(){
    this.router.navigate(['/login-otp']);
  }

  ResendOTP(loginForm : NgForm){
    let val2 = this.otp;
    const data = {
  emailOrMobile: this.val,
  otpCode : val2,
  type: 'Registration'
  };
     this.auth.send_otp(data).subscribe(
      res => {
                console.log("user is = "+res)
               // this.router.navigate(['/login-otp']);
       } ,
      err => console.log("something went wrong = "+err)
    )

  }


}