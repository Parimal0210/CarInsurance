import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VehicleUsageDetail } from '../models/VehicleUsageDetails';
import { AdminConsoleService } from '../services/admin_console.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExcelService } from '../services/excel.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

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
  uVehicle: any = [];
  vehicle: any = [];
  mName: [];
  lPlateNumber: [];
  date: any;
  vehicleKeyDate: any = [];
  vehicleKeyValue: any = [];
  todaysDate: any;
  constructor(private _service: AdminConsoleService, private http: HttpClient, private spinner: NgxSpinnerService, private excelService: ExcelService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.todaysDate = new Date();
  }

  //This method is responsible for mapping response
  //in single json object so that we can pass that json 
  //object to downloadExcel() to downloadExcel report.

  searchByDateRange() {
    var date1 = new Date();
    var date2 = new Date();
    date1 = this.startDate;
    date2 = this.endDate;
    var diff = Math.abs(Date.parse("" + date1) - Date.parse("" + date2));
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (this.startDate > this.endDate) {
      alert("Please select proper From date and To date!");
    } else if (diffDays > 35) {
      alert("Difference between two dates should be less than or equal to 35.")
    } else {

      this.spinner.show();
      this._service.getVehicleUsage(this.startDate, this.endDate).subscribe((data: any) => {

        this.VehicleUsageDetails = data.response;

        for (let k = 0; k < data.response.length; k++) {
          this.jsonData["customerName"]=data.response[k].customerName;
          this.jsonData["policyNumber"]=data.response[k].policyNumber;
          this.jsonData["modelName"] = data.response[k].modelName;
          this.jsonData["licensePlateNumber"] = data.response[k].licensePlateNumber;

          this.vehicle = data.response[k].usedVehicles;

          this.vehicleKeyDate = Object.keys(this.vehicle);
          this.vehicleKeyValue = Object.values(this.vehicle);

          var arr = Object.keys(this.vehicle).map(key => ({ type: key, value: this.vehicle[key] }));
          this.uVehicle = arr.sort((a, b) => a.type.localeCompare(b.type))

          for (let i = 0; i < this.uVehicle.length; i++) {
            this.date = this.datepipe.transform(this.uVehicle[i].type, 'yyyy-MM-dd');
            this.jsonData[this.date] = this.uVehicle[i].value;
          }

          this.jsonData["Total"] = data.response[k].totalUse;
          this.newJsonData[k] = this.jsonData;
          this.finalData[k] = Object.assign([], this.newJsonData[k]);
        }
        this.spinner.hide();
      });
    }
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
