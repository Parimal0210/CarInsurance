import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

 @Injectable({
   providedIn: 'root'
})

export class GetRebateDataService {
// private excelfile_api = `${environment.apiUrl}/uploadExcelFile`;
// private check_monthyear_api = `${environment.apiUrl}/checkMonthYear`;

// private check_excelFile_url = "http://49.248.214.214:8080/rebate_data/checkMonthYear";
// private upload_excelfile_url = "http://49.248.214.214:8080/rebate_data/uploadExcelFile";

// private baseApiUrl="http://49.248.214.214:8080/rebate_data/";
private baseApiUrl = "http://localhost:8080/rebate_data/";
// private get_rebateData_url = "http://49.248.214.214:8080/rebate_data/displayRefundData";

private get_rebateData_url = this.baseApiUrl+"displayRefundData";
private get_chart_url = this.baseApiUrl+"getChartData";

  constructor(private http: HttpClient) { }

  public get_RefundData(month:number,year:number):Observable<any>{
    const httpOptions = {
        params: { month, year}
    };
    return this.http.get<any>(this.get_rebateData_url+'/'+month+'/'+year);
  }

  public getGraphData():Observable<any>{
    return this.http.get<any>(this.get_chart_url);
  }

  /* post_uploadExcelFile(){
    return this.http.post(this.upload_excelfile_url);
  } */
}
