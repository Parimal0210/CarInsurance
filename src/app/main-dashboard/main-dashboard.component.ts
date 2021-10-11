import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerDetails } from '../models/CustomerDetails';
import { CustomerPolicy } from '../models/customerpolicy';
import { Otp } from '../models/otp';
import { AdminConsoleService } from '../services/admin_console.service';
import {  PaginationRequest } from '../models/PaginationRequest';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  name: any;
  customers: Customer[]; 
  otps : Otp[]; 
  pageNum : number = 0;
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
  pageSize:number=10;
  
  paginationRequest : PaginationRequest;
 

  
  constructor(private _service: AdminConsoleService, private http: HttpClient) { 
    // this.paginationRequest.pageNo=this.pageNum;
    // this.paginationRequest.pageSize=this.pageSize;
    // console.log(this.paginationRequest);
  }

  ngOnInit(): void { 
      this.name="";

      // const pg = {
      //   "pageNo":this.pageNum,
      //   "pageSize":this.pageSize,
      // }
      

      this._service.customerInfo().subscribe((data: any)=>{
        this.customers = data.response;
        console.log("All customers")
        console.log(this.customers);
        // this.pageNum = data.response.pageNum;
        // this.pageSize = data.response.pageSize;

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


