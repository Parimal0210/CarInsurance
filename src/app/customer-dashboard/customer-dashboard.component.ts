import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from '../models/CustomerDetails';
import { CustomerPolicy } from '../models/customerpolicy';
import { DatePipe } from '@angular/common';
import { AdminConsoleService } from '../services/admin_console.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
  providers: [DatePipe]
})
export class CustomerDashboardComponent implements OnInit {
  cname: any;
  cemail: any;
  cmobileNumber: any;
  caddress1: any;
  ccity: any;
  cprovince: any;
  cpostalCode: any;
  cidNumber: any;
  ccompanyName: any;
  ccompanyEmail: any;
  ccompanyMobileNumber: any;
  ccompanyAddress: any;
  ccompanyRegistrationNumber: any;

  sessionfname: any;
  sessionlname: any;
  sessionCustomerId: any;
  sessionamount: any;
  sessionPolicyId: any;

  customerDetails: CustomerDetails[];
  customerPolicies: CustomerPolicy[];
  myDate: any;

  cpolicies: any;
  ctotalBasePremium: any;
  ctotalPremiumPaid: any;
  ctotalSaving: any;
  ccorporatePolicy: any;

  constructor(
    private _service: AdminConsoleService,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  
    this.sessionfname = sessionStorage.getItem('fname');
    this.sessionlname = sessionStorage.getItem('lname');
    this.sessionamount = sessionStorage.getItem('Amount');

    this.myDate = new Date();

    this.sessionCustomerId = sessionStorage.getItem('CustomerId')
    this.sessionPolicyId = sessionStorage.getItem('PolicyId')

    this._service
      .getPolicyDetails(this.sessionPolicyId)
      .subscribe((data: any) => {
        this.customerPolicies = data.response.reverse();


        this.cpolicies = this.customerPolicies[0].policies;
        this.ctotalBasePremium = this.customerPolicies[0].totalBasePremium;
        this.ctotalPremiumPaid = this.sessionamount;
        this.ctotalSaving = this.customerPolicies[0].totalSaving;

        if(this.ccorporatePolicy == "yes"){
          this.ccorporatePolicy = "Corporate";
        }else{
          this.ccorporatePolicy = "Individual";
        }

        console.log("Policies: ");
        console.log(this.customerPolicies);
        console.log(this.cpolicies+" "+this.ctotalBasePremium);
      });

      this._service.getCustomerDetails(this.sessionCustomerId).subscribe((data: any)=>{
        this.customerDetails = data.response;
        console.log(this.customerDetails);
                
        let i =0;
        this.cname = data.response.name;
        this.cemail = data.response.email;
        this.cmobileNumber = data.response.mobileNumber;
        this.caddress1 = data.response.address1;
        this.ccity = data.response.city;
        this.cprovince = data.response.province;
        this.cpostalCode = data.response.postalCode;

        this.cidNumber  = data.response.idNumber;
        // console.log("CidNumber: ");
        // console.log(this.cidNumber);
        
        var  vis = this.cidNumber.slice(-4),  countNum = '';

        for(let i = (this.cidNumber.length)-4; i>0; i--){
            countNum += '*';
        }
        this.cidNumber = countNum+vis;
        this.ccompanyName = data.response.company.companyName;
        this.ccompanyEmail = data.response.company.email;
        this.ccompanyMobileNumber = data.response.company.mobileNumber;
        this.ccompanyAddress = data.response.company.address;
        this.ccompanyRegistrationNumber = data.response.company.companyRegNumber;
        var  crn = this.ccompanyRegistrationNumber.slice(-4),  countNum = '';

        for(let i = (this.ccompanyRegistrationNumber.length)-4; i>0; i--){
            countNum += '*';
        }
        this.ccompanyRegistrationNumber = countNum+crn;
    });
    
  }

  
}