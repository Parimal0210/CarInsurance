import { Time } from '@angular/common';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { _getOptionScrollPosition } from '@angular/material/core';
import { Router } from '@angular/router';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { interval  } from 'rxjs';
import { dematerialize } from 'rxjs/operators';
import { AdminConsoleService } from '../services/admin_console.service';

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
invalidOTP:String='';
fOtp: any;
logoutTime: number;
  constructor(private auth: AdminConsoleService,@Inject(Router) private router: Router) {

    }

  ngOnInit(): void {
    this.getLoginData()
    this.fOtp = document.getElementById('otpnumber');
    this.fOtp.focus();

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
// debugger;
let val1 = this.otp
console.log("Value = "+val1);
    const data = {
  emailOrMobile: this.val,
  otpCode : val1,
  type: 'Registration'
  };
 
//console.log("Data in OTP = "+data)
//console.log(loginForm.value)
    this.auth.enter_otp(data).subscribe(
      res => {
                console.log("Data = "+res)
                this.invalidOTP='';
                //alert("Logged in successfully!!!")
                this.router.navigate(['/main-dashboard']);
       } ,
       err => {
         this.invalidOTP='INVALID OTP!';
       } //console.log("something went wrong = "+err)
    )

  }

  Goback(){
    this.router.navigate(['/login-otp']);
  }

  ResendOTP(loginForm : NgForm){
     this.auth.send_otp(loginForm.value).subscribe(
      res => {
                console.log("user is = "+res)
                this.router.navigate(['/login-otp']);
       } ,
      err => console.log("something went wrong = "+err)
    )

  }

}



