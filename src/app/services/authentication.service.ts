import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    // public apiurl = "http://49.248.214.214:8080/customerLogin";
    public apiurl = "http://localhost:8080/customerLogin";

  emailData = {};
  otpData = {};

  isLoggedIn = false;

  //private __loginData = new BehaviorSubject<any>(null);



  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>
    (JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
  }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  //sendOTP(params:any) : Observable<any>
  send_otp(emailData: {})
  {

     return this.http.post<any>(`${this.apiurl}/sendOTP`,emailData, {responseType: 'json'})
    .pipe(map(user => {
      return user;
    }));
  }

  enter_otp(otpData : {}){

   // let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });

    return this.http.post<any>(`${this.apiurl}/login`,otpData, {responseType: 'json'})
    .pipe(map (response => {

      //returns the token field in api response
      localStorage.removeItem('token');

      let token = response.token;
      console.log("Token returned = "+token);
      console.log("Current User : "+ response.customerDTO.firstName+" "+response.customerDTO.lastName);

      sessionStorage.removeItem('currentLoggedInUser');
      let currentUser =  response.customerDTO.firstName+" "+response.customerDTO.lastName;
      sessionStorage.setItem('currentLoggedInUser', currentUser )
      
       localStorage.setItem('token', token);
     
      
      return response
    }),
    )

  }

  private __loginData = new BehaviorSubject<any>(null);
  current__applicantData= this.__loginData .asObservable();
    login_data(data:any){
    this.__loginData .next(data)
  }


   public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // storeToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  getToken() {
  // return JSON.parse(localStorage.getItem('token') || '{}')
    console.log("from authenticationService: "+ localStorage.getItem('token'));
    return localStorage.getItem('token')
  }

  removeToken() {
    localStorage.removeItem('token')
  }

}

