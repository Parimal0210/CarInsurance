import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerModule, DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
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
import { AdminConsoleService } from '../services/admin_console.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  chartOne:any;
  chartTwo:any;
  chartThree:any;

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

// type = 'AreaChart';  

data1 = new Array <number[]>();
data2 = new Array <number[]>();
data3 = new Array <number[]>();
// data1 : Array<{summaryDataId: number, customersCount: number}>=[];

// data = [  
//   ['Name1', 5.0],  
//   ['Name2', 36.8],  
//   ['Name3', 42.8],  
//   ['Name4', 18.5],  
//   ['Name5', 16.2]  
// ]; 

// options = {      
//   curveType: 'function',
//   smoothLine:'true', 
//   legend: { position: 'bottom' },
//    vAxis: {
//     gridlines: {
//         color: 'transparent'
//     },
//     textPosition: 'none',
//   },
//     hAxis: {
//       gridlines: {
//         color: 'transparent'
//     },
//     textPosition: 'none'
//   },
// };  
// width = 30;  
// height = 30;  
 months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

summaryAll : TotalSummaryData;

totalCustomers : number;
totalVehicles : number;
totalRefund : number;

summary : SummaryData[];


  
 
  constructor(private _service: AdminConsoleService) { 
    Chart.register(...registerables);
  }


  ngOnInit(): void {
    this.modelDate = new Date()
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate()-1);
    this.getChart(); 
  }

  getChart(){
    this._service.getGraphData().subscribe((data:any) =>{
      console.log(data)
      this.summaryAll = data.response;
      this.summary = this.summaryAll.allSummaryDatas
      console.log(this.summary);

      this.totalCustomers = this.summaryAll.totalCustomerCount;
      this.totalVehicles = this.summaryAll.totalVehicleCount;
      this.totalRefund = this.summaryAll.totalRefundAmount;

      console.log("Customers: "+this.totalCustomers);
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


      const chartDataCustomer = {
        labels: [
        this.months[this.data1[6][0]-1],
        this.months[this.data1[5][0]-1],
        this.months[this.data1[4][0]-1],
        this.months[this.data1[3][0]-1],
        this.months[this.data1[2][0]-1],
        this.months[this.data1[1][0]-1]
        ],
        datasets: [
          {
            label: 'Customers',
            data: [this.data1[6][1],this.data1[5][1],this.data1[4][1],this.data1[3][1],this.data1[2][1],this.data1[1][1]],
            borderColor: 'rgb(255 178 0 / 40%)',
            backgroundColor: 'rgb(255 178 0 / 50%)', 
            fill: true,
            tension: 0.5
          } 
        ]
      };

      const chartDataVehicle = {
        labels: [
        this.months[this.data2[6][0]-1],
        this.months[this.data2[5][0]-1],
        this.months[this.data2[4][0]-1],
        this.months[this.data2[3][0]-1],
        this.months[this.data2[2][0]-1],
        this.months[this.data2[1][0]-1]
        ],
        datasets: [
          {
            label: 'Vehicles',
            data: [this.data2[6][1],this.data2[5][1],this.data2[4][1],this.data2[3][1],this.data2[2][1],this.data2[1][1]],
            borderColor: 'rgb(0 92 255 / 40%)',
            backgroundColor: 'rgb(0 92 255 / 50%)', 
            fill: true,
            tension: 0.5
          } 
        ]
      };

      const chartDataRefund = {
        labels: [
        this.months[this.data3[6][0]-1],
        this.months[this.data3[5][0]-1],
        this.months[this.data3[4][0]-1],
        this.months[this.data3[3][0]-1],
        this.months[this.data3[2][0]-1],
        this.months[this.data3[1][0]-1]
        ],
        datasets: [
          {
            label: 'Refund',
            data: [this.data3[6][1],this.data3[5][1],this.data3[4][1],this.data3[3][1],this.data3[2][1],this.data3[1][1]],
            borderColor: 'rgb(37 186 42 / 40%)',
            backgroundColor: 'rgb(37 186 42 / 50%)', 
            fill: true,
            tension: 0.5
          } 
        ]
      };

      this.chartOne = new Chart('customer', {
        type: 'line',
        data: chartDataCustomer,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    display: false
                },
                x: {
                  beginAtZero: true,
                  display: false
              }
            },
            plugins: {
              legend: {
                  display: false,
                  
              }
          }  
        }
      });
  
      this.chartTwo = new Chart('vehicle', {
        type: 'line',
        data: chartDataVehicle,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    display: false
                },
                x: {
                  beginAtZero: true,
                  display: false
              }
            },
            plugins: {
              legend: {
                  display: false,
                  
              }
          }  
        }
      });
  
      this.chartThree = new Chart('refunds', {
        type: 'line',
        data: chartDataRefund,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    display: false
                },
                x: {
                  beginAtZero: true,
                  display: false
              }
            },
            plugins: {
              legend: {
                  display: false,
                  
              }
          }  
        }
      });
    })

  }

}
