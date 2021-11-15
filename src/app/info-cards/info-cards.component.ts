import { BsDatepickerConfig, BsDatepickerModule, DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { Component, OnInit, ViewChild } from '@angular/core';
//test code
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import { TotalSummaryData } from 'src/app/models/TotalSummaryData';
import { SummaryData } from '../models/SummaryData';
import { RefundData } from '../models/RefundData';
import { RefundEachData } from '../models/RefundEachData';
import { AdminConsoleService } from '../services/admin_console.service';
import { ItemModel, BeforeOpenCloseMenuEventArgs, DropDownButtonComponent  } from '@syncfusion/ej2-angular-splitbuttons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
// import { MatTableDataSource } from '@angular/material/table';
// import {  MatPaginator } from '@angular/material/paginator';
// import {  MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from "ngx-spinner";

 const moment = _rollupMoment || _moment;



@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InfoCardsComponent implements OnInit {

  // displayedColumns = ['Customer Name', 'Policies', 'Vehicles', 'Refund','Uploaded','Uploaded On','Upload Message'];
  // dataSource: MatTableDataSource<RefundData>;

  // expandedElement: any;

  // @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  // @ViewChild('sort', { static: false }) sort: MatSort;

 //date = new FormControl(moment());
  errorMessage: String = "\n\nPlease rectify the error and upload the file again.";
  modelDate : Date | any;
  today: Date;
  yesterday : Date;
  datePicker: Partial<BsDatepickerConfig> | any;
  statusMessage : string;
  statusMessageDone : String;
  dateCustomClasses: DatepickerDateCustomClasses[] | any;

  successCount:number;
  failCount:number;
  tutukaStatusMessage:string
  filePath : String;

  fetchedDate : Date | any
  //tableData
  refundEachDatas: RefundEachData[];
  isDisplay = false;


  onOpenCalendar(ngxdatepicker: any) {
    ngxdatepicker.monthSelectHandler = (event: any): void => {
      if(event.date > this.today)
        this.modelDate = this.today
      else
        this.modelDate = event.date
      this.updateMyDate(this.modelDate);
      return;
    };
    ngxdatepicker.setViewMode('month');
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }

  constructor(public datepipe: DatePipe,private _service: AdminConsoleService,private router:Router, private spinner: NgxSpinnerService) {
      // this.dataSource = new MatTableDataSource();

   this.fetchedDate = this.datepipe.transform(this.fetchedDate, 'MMMM YYYY')
   this.dateCustomClasses = { date: this.fetchedDate };
   this.modelDate = this.datepipe.transform(this.fetchedDate, 'MMMM YYYY')
   this.dateCustomClasses = { date: this.modelDate };
   this.datePicker = Object.assign({}, { containerClass: 'theme-red' },
  { dateInputFormat: 'MMMM YYYY' }, { isAnimated: true }, { dateCustomClasses: this.modelDate } )

  }

  updateMyDate(newDate:Date){
    console.log("New Date: "+newDate);
    this.getAllData(newDate);
  }

  loadSpinner(){
    this.spinner.show();
  }

  getAllData(date:Date){

    this.successCount=0
    this.failCount=0
    console.log(date.getMonth()+1+" "+date.getFullYear())
    this._service.get_RefundData(date.getMonth()+1,date.getFullYear()).subscribe((data) => {
      this.refunds = data.response;
      
      this.refunds.forEach((data1)=>{
       
        this._service.getRefundEachData(data1.customerId,this.modelDate.getMonth()+1,this.modelDate.getFullYear()).subscribe((data: any)=>{
          this.refundEachDatas = data.response;
          console.log("Customer Each Policy Details for Customer Id: "+data1.customerId);
          console.log(data);
          

          console.log("check below");
          console.log(this.refundEachDatas);
    
          if(this.refundEachDatas[0]['uploadedOn']){
            this.refundEachDatas.forEach((data)=>{
              if(data.tutukaUploadFlag.valueOf() == false)
                this.failCount = this.failCount + 1;
              if(data.tutukaUploadFlag.valueOf() == true)
                this.successCount = this.successCount + 1;  
            })
    
            this.refunds.map((data)=>{
              data1.statusMessage = this.successCount+" Successful! "+this.failCount+" Failed!";
            })
           
          }else{
            this.refunds.map((data)=>{
              data.statusMessage = "NA";
            })
          }
          this.successCount=0
          this.failCount=0
        });
      })
      
        console.log(this.refunds)
        console.log("Count: "+this.refunds.length)
    })
  }

 

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File;

  onChange(event:any) {
    this.file = event.target.files[0];
}

flag:Boolean =false;
  uploadExcel(){
    this.loading = !this.loading;

        const formData = new FormData();

        formData.append("file", this.file, this.file.name);

            this._service.post_uploadExcelFile(formData).subscribe(
              (event: any) => {
                  if (typeof (event) === 'object') {
    
                      // Short link via api response
                      this.shortLink = event.link;
    
                      this.loading = false; // Flag variable 
                  }
                  this.filePath = event.response
                  console.log("File path: "+this.filePath)
  
                  console.log("File path main: "+this.filePath)
                  this._service.post_addRebateData(this.filePath,this.modelDate.getMonth()+1).subscribe((data:any) => {
                    this.spinner.hide();
                    if(data.statusCode == 200){
                      this.statusMessageDone = data.statusMessage;
                      console.log("Status: "+this.statusMessageDone)
        
                      this._service.get_RefundData(this.modelDate.getMonth()+1,this.modelDate.getFullYear()).subscribe((data:any)=>{
                        this.refunds = data.response;
                        
                      },(error) => {
                        this.spinner.hide();
                        this.statusMessage = error.error.statusMessage;
                        console.log("Error: "+this.statusMessage)
                      })
                    }
                  },(error) => {                
                    this.spinner.hide();
                      this.statusMessage = error.error.statusMessage;
                      console.log("Error1: "+this.statusMessage)
                  })
                  
              },error =>{
                this.spinner.hide();
                console.log(error)
              }
          )    

  }

  refunds: RefundData[];

  getValueOfTd(rowCustomerId: any){

    this._service.getRefundEachData(rowCustomerId,this.modelDate.getMonth()+1,this.modelDate.getFullYear()).subscribe((data: any)=>{
      this.refundEachDatas = data.response;
      console.log("Customer Each Policy Details for Customer Id: "+rowCustomerId);
      console.log(this.refundEachDatas);
    });
  }
  myIndex:any;
  toggleDisplay(i: any){
      this.isDisplay = ! this.isDisplay;
      this.myIndex = i;
      console.log("clicked index: "+this.myIndex);
      
  }

  clearText(){
    this.statusMessage='';
    this.statusMessageDone='';
  }

  tutuka(){
    this._service.uploadRefund(this.modelDate.getMonth()+1,this.modelDate.getFullYear()).subscribe((data: any)=>{
     this.tutukaStatusMessage = data.response
      console.log("response returned: "+this.tutukaStatusMessage);
      this.getAllData(this.modelDate)
    });
   }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    // this.dataSource.data = this.refunds;
      this.today = new Date()

    this.modelDate = new Date()
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate()-1);

    
    this.getAllData(this.modelDate);

    console.log(this.modelDate)
  }



}