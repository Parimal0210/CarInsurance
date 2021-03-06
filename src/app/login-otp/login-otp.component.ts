import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminConsoleService } from '../services/admin_console.service';
// import { MatSpinner } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnInit {

   loginUserData :any;
   loginForm : FormGroup | any
   userName:any;

  
  constructor(private auth: AdminConsoleService,
    private router : Router, private actroute: ActivatedRoute, private spinner: NgxSpinnerService) {

    }

  ngOnInit(): void {
    this.userName = document.getElementById('userName');
    this.userName.focus();
  }

  loadSpinner(){
    this.spinner.show();
  }

    GetOTP(loginForm: NgForm){

  const data = {
  emailOrMobile: this.loginUserData,
  type: 'login',
  adminApplication: 'AdminConsole'

    };

    this.auth.send_otp(data).subscribe(
      res => {
     
        this.spinner.hide();
      
                //console.log("user is = "+loginForm.value)
               let UserData : any = loginForm.value;
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

