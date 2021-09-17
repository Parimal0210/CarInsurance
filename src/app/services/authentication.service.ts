import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserForLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public apiurl = "http://49.248.214.214:8080/customerLogin";
  emailData = {}
  otpData = {}

  //private __loginData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  //sendOTP(params:any) : Observable<any>
  send_otp(emailData: {})
  {

     return this.http.post<any>(`${this.apiurl}/sendOTP`,emailData, {responseType: 'json'})
    .pipe(map(user => {
      return user;
    }));
  }

  enter_otp(otpData : {}){

    return this.http.post<any>(`${this.apiurl}/login`,otpData, {responseType: 'json'})
    .pipe(map (user => {
      return user
    }))

  }

  private __loginData = new BehaviorSubject<any>(null);
  current__applicantData= this.__loginData .asObservable();
    login_data(data:any){
    this.__loginData .next(data)
  }


}

