import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerAndOtpService {

  constructor(private _http: HttpClient) { }

  getToken(){
    return localStorage.getItem('token')
  }

  public latestOtp():Observable<any>{
    return this._http.get<any>("http://localhost:8080/rebate_data/getOtpList");
  }

  public customerInfo():Observable<any>{
    return this._http.get<any>("http://localhost:8080/rebate_data/getCustomerInfo");
  }


  public getCustomerDetails(fname:string, lname:string):Observable<any>{
    const httpOptions = {
      params: { fname, lname}
  };
    return this._http.get<any>("http://localhost:8080/rebate_data/getCustomerDetails", httpOptions);
  }

  
  public getPolicyDetails(fname:string, lname:string):Observable<any>{
    const httpOptions = {
      params: { fname, lname}
  };
    return this._http.get<any>("http://localhost:8080/rebate_data/getPolicyDetails", httpOptions);
  }

  public getRefundEachData(customerId: number):Observable<any>{
    return this._http.get<any>(`http://localhost:8080/rebate_data/displayEachRefundData/${customerId}`);
  }
 

}
