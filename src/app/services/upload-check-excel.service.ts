import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
private excelfile_api = `${environment.apiUrl}/uploadExcelFile`;
private check_monthyear_api = `${environment.apiUrl}/checkMonthYear`;

private check_excelFile_url = "http://49.248.214.214:8080/rebate_data/checkMonthYear";
private upload_excelfile_url = "http://49.248.214.214:8080/rebate_data/uploadExcelFile";

  constructor(private http: HttpClient) { }

  get_CheckMonthYear(){
    return this.http.get(this.check_excelFile_url);
  }

  /* post_uploadExcelFile(){
    return this.http.post(this.upload_excelfile_url);
  } */
}
