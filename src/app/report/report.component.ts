import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VehicleUsageDetail } from '../models/VehicleUsageDetails';
import { AdminConsoleService } from '../services/admin_console.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExcelService } from '../services/excel.service';
import { Foo } from '../models/Foo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

  startDate: Date = new Date("1970-01-01");
  endDate: Date = new Date();
  VehicleUsageDetails: VehicleUsageDetail[];
  jsonData: any = {};
  newJsonData: any = {};
  finalData: any = [];
  data: any;
  dRange: [];
  uVehicle: [];
  vehicle: any = [];
  mName: [];
  lPlateNumber: [];
  date: any;

  constructor(private _service: AdminConsoleService, private http: HttpClient, private spinner: NgxSpinnerService, private excelService: ExcelService, public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  //This method is responsible for mapping response
  //in single json object so that we can pass that json 
  //object to downloadExcel() to downloadExcel report.

  searchByDateRange() {
    console.log(this.startDate)
    console.log(this.endDate)
    this._service.getVehicleUsage(this.startDate, this.endDate).subscribe((data: any) => {

      this.VehicleUsageDetails = data.response;

      for (let i = 0; i < 1; i++) {
        this.dRange = data.response[i].dateRange;
      }

      for (let k = 0; k < data.response.length; k++) {
        this.jsonData["modelName"] = data.response[k].modelName;
        this.jsonData["licensePlateNumber"] = data.response[k].licensePlateNumber;

        this.vehicle[k] = data.response[k].usedVehicle;

        for (let l = 0; l < this.dRange.length; l++) {
          this.date = this.datepipe.transform(this.dRange[l], 'yyyy-MM-dd');
          this.jsonData[this.date] = this.vehicle[k][l];
        }
        this.jsonData["Total"] = data.response[k].totalUse;
        this.newJsonData[k] = this.jsonData;

        this.finalData[k] = Object.assign([], this.newJsonData[k]);
      }
      this.spinner.hide();
    });
  }


  loadSpinner() {
    this.spinner.show();
  }

  //This method is responsible for downloading the excel report for selected date range 
  downloadExcel() {
    this.spinner.show();
    if (!this.finalData) {
      console.log("Please select the date range and search & then click on download.");
    } else {
      this.excelService.exportAsExcelFile(this.finalData, 'VehicleUsage');
    }
    this.spinner.hide();
  }
}
