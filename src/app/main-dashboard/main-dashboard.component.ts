import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/customer';
import { CustomerDetails } from 'src/CustomerDetails';
import { CustomerPolicy } from 'src/customerpolicy';
import { Otp } from 'src/otp';
import { CustomerAndOtpService } from '../services/customer-and-otp.service';


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  name: any;
  customers: Customer[]; 
  otps : Otp[]; 
  pcustomers : number = 0;
  potps: number = 0;
  searchValue: string;
  tempName : string = '';
  origName : string = ''; 
  customerName: string;
  customer:string;
  fname: string;
  lname: string;
  customerDetails: CustomerDetails[];
  customerPolicies: CustomerPolicy[];

  
 

  
  constructor(private _service: CustomerAndOtpService, private http: HttpClient) { }

  ngOnInit(): void { 
      this.name="";
     
      this._service.customerInfo().subscribe((data: any)=>{
        this.customers = data.response;
        console.log(this.customers);
      });


      this._service.latestOtp().subscribe((data: any)=>{
        this.otps = data.response;
        console.log(this.otps);
    })
      
  }

  getValueOfTd(customer:any, _customerId: any, _amount: any){

    this.fname = customer.split(' ')[0];
    this.lname = customer.split(' ')[1];

    sessionStorage.setItem('fname',this.fname);
    sessionStorage.setItem('lname',this.lname);

    console.log("Id: "+_customerId);
    sessionStorage.setItem('CustomerId',_customerId);
    sessionStorage.setItem('Amount',_amount);
  }
}


