import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { yearsPerPage } from '@angular/material/datepicker';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })
};

 @Injectable({
   providedIn: 'root'
})

export class UploadCheckExcelService {


// private check_excelFile_url = "http://49.248.214.214:8080/rebate_data/checkMonthYear";
// private upload_excelfile_url = "http://49.248.214.214:8080/rebate_data/uploadExcelFile";


//private baseApiUrl="http://49.248.214.214:8080/rebate_data/";
private baseApiUrl = "http://localhost:8080/rebate_data/"

private check_excelFile_url = this.baseApiUrl+"checkMonthYear";
private upload_excelFile_url = this.baseApiUrl+"uploadExcelFile";
private add_rebateData_url = this.baseApiUrl+"getRebateData";

  constructor(private http: HttpClient) { }

  get_CheckMonthYear(){
    return this.http.get(this.check_excelFile_url);
  }

  post_addRebateData(filePath:String){

    return this.http.post(this.add_rebateData_url,filePath)
  }
   post_uploadExcelFile(formData:FormData):Observable<any>{


    // formData.forEach((value,key) => {
    //   console.log(value.toString())
    //    });

    //  const htp = {
    //   params: { 
    //     'file':formData
    //   }
    // };
  
    return this.http.post<any>(this.upload_excelFile_url,formData);
  } 
}
