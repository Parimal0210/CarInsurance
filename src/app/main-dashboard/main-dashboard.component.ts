import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerDetails } from '../models/CustomerDetails';
import { CustomerPolicy } from '../models/customerpolicy';
import { Otp } from '../models/otp';
import { AdminConsoleService } from '../services/admin_console.service';
import {  PaginationRequest } from '../models/PaginationRequest';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  name: any;
  customers: Customer[]; 
  otps : Otp[]; 
  pageNum : number = 1;
  totalPages:number;
  totalItems:number
  potps: number = 1;
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
  
  totalOtpItems:number
  totalOtpPages:number

  paginationRequest : PaginationRequest;
 
 pg = {
    "pageNo":this.pageNum,
    "pageSize":this.pageSize
  }

  pgOtp={
    "pageNo":this.potps,
    "pageSize":this.pageSize
  }
  
  constructor(private _service: AdminConsoleService, private http: HttpClient) { 
    // this.paginationRequest.pageNo=this.pageNum;
    // this.paginationRequest.pageSize=this.pageSize;
    // console.log(this.paginationRequest);
  }

  ngOnInit(): void { 
      this.name="";

    
      
      this.pg.pageNo -=1
      this._service.customerInfo(this.pg).subscribe((data: any)=>{
        this.customers = data.response.list;
        console.log("All customers11")
        console.log(this.customers);
         this.pageNum = data.response.pageNo;
         this.pageSize = data.response.pagesize;
         this.totalPages = data.response.totalPageSize;
         this.totalItems =  this.totalPages * this.pageSize
         console.log(this.pageNum,this.pageSize,this.totalItems)

      });

      this.pgOtp.pageNo -= 1
      this._service.latestOtp(this.pgOtp).subscribe((data: any)=>{
        this.otps = data.response.list;
        this.potps = data.response.pageNo;
        this.pageSize = data.response.pagesize;
        this.totalOtpPages = data.response.totalPageSize;
        this.totalOtpItems =  this.totalOtpPages * this.pageSize
        console.log(this.potps,this.totalOtpPages,this.totalOtpItems)  
    })
      
  }

  sendPage(event: PageChangedEvent){
    this.pageNum =event.page
    this.pg.pageNo = this.pageNum-1
    this._service.customerInfo(this.pg).subscribe((data: any)=>{
      this.customers = data.response.list;
      console.log("All customers")
      console.log(this.customers);
       this.pageNum = +data.response.pageNo;
       this.pageSize = +data.response.pagesize;
       this.totalPages = +data.response.totalPageSize;
       this.totalItems =  this.totalPages * this.pageSize
       console.log(this.pageNum,this.pageSize,this.totalItems)

    });
  }

  sendOtpPage(event: PageChangedEvent){
    this.potps =event.page
    this.pgOtp.pageNo = this.potps-1

    this._service.latestOtp(this.pgOtp).subscribe((data: any)=>{
      this.otps = data.response.list;
      this.potps = data.response.pageNo;
      this.pageSize = data.response.pagesize;
      this.totalOtpPages = data.response.totalPageSize;
      this.totalOtpItems =  this.totalOtpPages * this.pageSize
      console.log(this.potps,this.totalOtpPages,this.totalOtpItems)
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


