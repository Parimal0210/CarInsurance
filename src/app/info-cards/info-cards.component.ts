import { BsDatepickerConfig, BsDatepickerModule, DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { Component, OnInit } from '@angular/core';
import { UploadCheckExcelService } from '../services/upload-check-excel.service';
//test code
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadExcelService } from '../services/upload-excel.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import { GetRebateDataService } from '../services/get-rebatedata.service';
import { TotalSummaryData } from 'src/TotalSummaryData';
import { SummaryData } from 'src/SummaryData';
import { RefundData } from 'src/RefundData';

  
 const moment = _rollupMoment || _moment;



@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],
})

export class InfoCardsComponent implements OnInit {
 //date = new FormControl(moment());


  modelDate : Date | any;
  yesterday : Date;
  datePicker: Partial<BsDatepickerConfig> | any;
  statusMessage : string;
  statusMessageDone : String;
  dateCustomClasses: DatepickerDateCustomClasses[] | any;

  filePath : String;
//fetchedDate = new Date()

  fetchedDate : Date | any
//-------------------------------------------------------------------
//graph data
//title = 'Char api';
title1 = 'Customer';  
title2 = 'Vehicles'; 
title3 = 'Refund'; 

type = 'AreaChart';  

data1 = new Array <number[]>();
data2 = new Array <number[]>();
data3 = new Array <number[]>();
//data1 : Array<{summaryDataId: number, customersCount: number}>=[];

data = [  
  ['Name1', 5.0],  
  ['Name2', 36.8],  
  ['Name3', 42.8],  
  ['Name4', 18.5],  
  ['Name5', 16.2]  
]; 

options = {      
  curveType: 'function',
  smoothLine:'true', 
  legend: { position: 'bottom' },
   vAxis: {
    gridlines: {
        color: 'transparent'
    },
    textPosition: 'none',
},
  hAxis: {
    gridlines: {
      color: 'transparent'
  },
  textPosition: 'none'
},
};  
width = 300;  
height = 300;  

summaryAll : TotalSummaryData;

totalCustomers : Number;
totalVehicles : Number;
totalRefund : Number;

summary : SummaryData[];
//-------------------------------------------------------------------
 /* chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  } */

//----------------------------------------------------------------
  onOpenCalendar(ngxdatepicker: any) {
  //  debugger;
    ngxdatepicker.monthSelectHandler = (event: any): void => {
      // ngxdatepicker.store.dispatch(ngxdatepicker._actions.select(event.date));
      // ngxdatepicker.value = event.date;
      // this.modelDate = ngxdatepicker.value;
      this.modelDate = event.date
      console.log("Inner Inner Inside Month:"+event.date)
      console.log("Inner Inside Month:"+ngxdatepicker.value)
      console.log("Inside Month:"+this.modelDate)
      this.updateMyDate(this.modelDate);
      return;
    };
    ngxdatepicker.setViewMode('month');

    console.log("Month:"+this.modelDate)
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }

  constructor(public datepipe: DatePipe,private _service: GetRebateDataService,private _service1: UploadCheckExcelService
    ) {

   this.fetchedDate = this.datepipe.transform(this.fetchedDate, 'MMMM YYYY')
   this.dateCustomClasses = { date: this.fetchedDate };

//this.fetchedDate = new Date()
   this.modelDate = this.datepipe.transform(this.fetchedDate, 'MMMM YYYY')
   this.dateCustomClasses = { date: this.modelDate };

   //This object is used to set properties to datePicker
   this.datePicker = Object.assign({}, { containerClass: 'theme-red' },
  { dateInputFormat: 'MMMM YYYY' }, { isAnimated: true }, { dateCustomClasses: this.modelDate } )

  }

  updateMyDate(newDate:Date){
    console.log("New Date: "+newDate);
    this.getAllData(newDate);
  }

  getAllData(date:Date){

    console.log(date.getMonth()+1+" "+date.getFullYear())
    this._service.get_RefundData(date.getMonth()+1,date.getFullYear()).subscribe((data) => {
      this.refunds = data.response;
        console.log("Response1: "+this.refunds)
        console.log("Count: "+this.refunds.length)
    })
  }

  getChart(){
    this._service.getGraphData().subscribe((data:any) =>{
      console.log(data)
      this.summaryAll = data.response;
      this.summary = this.summaryAll.allSummaryDatas
      console.log("Response: "+this.summary);

    this.totalCustomers = this.summaryAll.totalCustomerCount;
    this.totalVehicles = this.summaryAll.totalVehicleCount;
    this.totalRefund = this.summaryAll.totalRefundAmount;

    console.log("Customers: "+this.totalCustomers);
      // this.summary.forEach((x:SummaryData) => {
      //   this.data1.push({summaryDataId: x.summaryDataId,customersCount:x.customersCount})
      // })
      this.summary.forEach((x:SummaryData) =>{
       let arr = new Array(x.summaryDataId,x.customersCount)
        this.data1.push(arr)
      })
      console.log("data1"+this.data1)

      this.summary.forEach((x:SummaryData) => {
        let arr = new Array(x.summaryDataId,x.vehiclesCount)
        this.data2.push(arr)
      })
      console.log(this.data2)

      this.summary.forEach((x:SummaryData) => {
        let arr = new Array(x.summaryDataId,x.totalRefund)
        this.data3.push(arr)
      })
      console.log(this.data3)
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
        console.log(this.file);

        const formData = new FormData();

        formData.append("file", this.file, this.file.name);


        this._service1.get_CheckMonthYear().subscribe((data:any)=>{

          if(data.statusCode == 200 && !data.response){

            this._service1.post_uploadExcelFile(formData).subscribe(
              (event: any) => {
                  if (typeof (event) === 'object') {
    
                      // Short link via api response
                      this.shortLink = event.link;
    
                      this.loading = false; // Flag variable 
                  }
                  this.filePath = event.response
                  console.log("File path: "+this.filePath)
  
                  console.log("File path main: "+this.filePath)
                  this._service1.post_addRebateData(this.filePath).subscribe((data:any) => {
                    if(data.statusCode == 200){
                      this.statusMessageDone = data.statusMessage;
                      console.log("Status: "+this.statusMessageDone)
        
                      this._service.get_RefundData(this.modelDate.getMonth()+1,this.modelDate.getFullYear()).subscribe((data:any)=>{
                        this.refunds = data.response;
                                     
                      },(error) => {
                        this.statusMessage = error.error.statusMessage;
                        console.log("Error: "+this.statusMessage)
                      })
                    }
                  },(error) => {                
                      this.statusMessage = error.error.statusMessage;
                      console.log("Error1: "+this.statusMessage)
                  })
                  
              },error =>{
                console.log(error)
              }
          )

          }else if(data.statusCode == 200 && data.response){
            this.statusMessage = "Data of current month already exists!";
            console.log("Error2: "+this.statusMessage)
          }
        })      

  }

  refunds: RefundData[];


  ngOnInit(): void {

    

    this.modelDate = new Date()
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate()-1);

    this.getChart();
    
    this.getAllData(this.modelDate);

    console.log(this.modelDate)
  }



}