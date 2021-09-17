import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnInit {

   loginUserData = {}
   loginForm : FormGroup | any


  constructor(private auth: AuthenticationService,
    private router : Router, private actroute: ActivatedRoute) {

    }

  ngOnInit(): void {

  }
/* UserData = new FormGroup( {
      emailOrMobile : new FormControl(''),
      type : new FormControl('')
    }) */

    GetOTP(loginForm: NgForm){

  const data = {
  emailOrMobile: this.loginUserData,
  type: 'login'

    };

    this.auth.send_otp(data).subscribe(
      res => {
                //console.log("user is = "+loginForm.value)
               let UserData : any = loginForm.value;
               console.log(UserData);
                this.router.navigate(['/otp']/* ,{
                  queryParams: {UserData: JSON.stringify(UserData)}
                } */
                );
       } ,
      err => console.log("something went wrong = "+err)
    )
       this.auth.login_data(data);
  }



}

