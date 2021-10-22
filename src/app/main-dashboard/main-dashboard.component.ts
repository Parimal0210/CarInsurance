import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
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

 // @ViewChild(PaginationModule) paginator: PaginationModule
  name: any;
  customers: Customer[]; 
  otps : Otp[]; 
  pageNum : number = 1;
  totalPages:number;
  totalItems:number
  potps: number = 1;
  tempName : string = '';
  origName : string = ''; 
  customerName: string;
  customer:string;
  fname: string;
  lname: string;
  customerDetails: CustomerDetails[];
  customerPolicies: CustomerPolicy[];
  pageSize:number=5;

  totalOtpItems:number
  totalOtpPages:number

  paginationRequest : PaginationRequest;
  searchValue:string="";
   pg = {
    "pageNo":this.pageNum,
    "pageSize":this.pageSize
  }

  searchPg = {
    "pageNo":0,
    "pageSize": this.pageSize
  }

  pgOtp={
    "pageNo":this.potps,
    "pageSize":this.pageSize
  }
  
  // key: string = 'name';
  // reverse: boolean = false;
  
  constructor(private _service: AdminConsoleService, private http: HttpClient) { 
    // this.paginationRequest.pageNo=this.pageNum;
    // this.paginationRequest.pageSize=this.pageSize;
    // console.log(this.paginationRequest);
  }

  // sort(key:any){
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }
  ngOnInit(): void { 

    
      this.name="";
      this.searchValue=""
      this.pg.pageNo -=1;
      this._service.customerInfo(this.pg,this.searchValue).subscribe((data: any)=>{
      
        this.customers = data.response.list;
        console.log("All customers11");
        console.log(this.customers);
         this.pageNum = data.response.pageNo;
         this.pageSize = data.response.pagesize;
         this.totalPages = data.response.totalPageSize;
         this.totalItems =  this.totalPages * this.pageSize
         console.log(this.pageNum,this.pageSize,this.totalItems)
      });

      // this._service.searchInfo(this.searchPg,this.searchValue).subscribe((data: any)=>{
      //   console.log("Searched String");
      //   console.log(this.searchValue);
      //   this.customers = data.response.list;
      //   console.log("Search Customers: ");
      //   console.log(this.customers);
      // });
      

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
    this.pageNum =event.page;
    this.pg.pageNo = this.pageNum-1;
    this._service.customerInfo(this.pg,this.searchValue).subscribe((data: any)=>{
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

  clearSearch(){
    this.searchValue=""
    this._service.searchInfo(this.searchPg,this.searchValue).subscribe((data: any)=>{
      console.log("Searched String33");
      console.log(this.searchValue);
      this.customers = data.response.list;
      console.log("Search Customers: ");
      console.log(this.customers);
    });
  }


  searchPage(event:any,searchVal:string){
    console.log(event.keyCode);
  
      if(event.keyCode === 8){
        this.searchValue = this.searchValue.slice(0, -1);
        console.log("str: "+this.searchValue);
      
      }else{
        this.searchValue = searchVal + event.key;
      }
      
      console.log("new  string: "+this.searchValue);
      
      if(this.searchValue != ""){
    
        this._service.searchInfo(this.searchPg,this.searchValue).subscribe((data: any)=>{
          console.log("Searched String11");
          console.log(this.searchValue);
          this.customers = data.response.list;
          console.log("Search Customers: ");
          console.log(this.customers);
          this.pageNum = data.response.pageNo;
          this.pageSize = data.response.pagesize;
          this.totalPages = data.response.totalPageSize;
          this.totalItems =  this.totalPages * this.pageSize;
        });
      }else{
        this.searchValue=""
        this._service.searchInfo(this.searchPg,this.searchValue).subscribe((data: any)=>{
          console.log("Searched String22");
          console.log(this.searchValue);
          this.customers = data.response.list;
          console.log("Search Customers: ");
          console.log(this.customers);
        });
      }
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

  pageChanged:PageChangedEvent;
  refreshOTP(){
    // this.pageChanged.page = 1
    // this.sendOtpPage(this.pageChanged)
   
    this.potps =1
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
}



function sort(key: any) {
  throw new Error('Function not implemented.');
}

