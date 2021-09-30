import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerModule, DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
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

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {


  modelDate : Date | any;
  yesterday : Date;
  statusMessage : String;
  statusMessageDone : String;
  

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
  constructor(private _service: GetRebateDataService) { }



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




  ngOnInit(): void {
    this.modelDate = new Date()
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate()-1);
    this.getChart();
  }

  

}
