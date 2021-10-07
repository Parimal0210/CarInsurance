import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerAndOtpService {

  //private baseApiUrl="http://49.248.214.214:8080/rebate_data/";
  private baseApiUrl="http://localhost:8080/rebate_data/";
  constructor(private _http: HttpClient) { }

  getToken(){
    return localStorage.getItem('token')
  }

  public latestOtp():Observable<any>{
    return this._http.get<any>(this.baseApiUrl+"getOtpList");
  }

  public customerInfo():Observable<any>{
    return this._http.get<any>(this.baseApiUrl+"getCustomerInfo");
  }


  public getCustomerDetails(fname:string, lname:string):Observable<any>{
    const httpOptions = {
      params: { fname, lname}
  };
    return this._http.get<any>(this.baseApiUrl+"getCustomerDetails", httpOptions);
  }

  
  public getPolicyDetails(fname:string, lname:string):Observable<any>{
    const httpOptions = {
      params: { fname, lname}
  };
    return this._http.get<any>(this.baseApiUrl+"getPolicyDetails", httpOptions);
  }

  public getRefundEachData(customerId: number):Observable<any>{
    return this._http.get<any>(this.baseApiUrl+"displayEachRefundData/"+customerId);
  }
 

}
