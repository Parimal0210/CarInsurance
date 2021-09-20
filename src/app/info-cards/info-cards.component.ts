import { Component, OnInit } from '@angular/core';
import {UploadCheckExcelService} from '../services/upload-check-excel.service';
//test code
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadExcelService } from '../services/upload-excel.service';
import { DatePipe } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY', // this is the format showing on the input element
    monthYearLabel: 'MMMM YYYY', // this is showing on the calendar
  },
};

//
@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],

  //test code
   providers: [DatePipe
  ],
  //

})

export class InfoCardsComponent implements OnInit {

   modelDate = '';
   currentDate = new Date();
  //UIForm: FormGroup;

   // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file:File | any; // Variable to store file


   onOpenCalendar(ngxdatepicker:any) {
    ngxdatepicker.monthSelectHandler = (event: any): void => {
     //ngxdatepicker.store.dispatch(ngxdatepicker._actions.select(event.date));
    ngxdatepicker.value = event.date;
    this.modelDate = ngxdatepicker.value;
    //-------------------------
    //  this.scope.getDatetime = function() {
  //return (new Date).toLocaleFormat("%A, %B %e, %Y");

    //------------------------
    return;
    };
    ngxdatepicker.setViewMode('month');
  }

  uploadFile($event:any) {
    console.log($event.target.files[0]); // outputs the first file
}

  constructor(private monthyear: UploadCheckExcelService, private fileUploadService: UploadExcelService,
    private datePipe: DatePipe) {
     // this.currentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    //this.monthyear.get_CheckMonthYear().subscribe(data =>{
     // alert("Excel File for Month Year = "+data);
    //  console.warn("Check Excel File for Month Year = "+data);
    //})
    //test code
   /*  this.UIForm = new FormGroup({
      CalMonth: new FormControl(moment()),
  }) */
  //
  }
  ngOnInit(): void {
  }

  /* onUpload() {
        this.loading = !this.loading;
        console.log(this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
            //  alert("File Upload")
                if (typeof (event) === 'object') {

                    // Short link via api response
                    alert("File uploaded")
                    this.shortLink = event.link;

                    this.loading = false; // Flag variable
                }
            }
        );
    } */


}
