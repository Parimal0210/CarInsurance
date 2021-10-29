import { environment } from 'src/environments/environment';
import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {  PaginationRequest } from '../models/PaginationRequest';
import { Router } from '@angular/router';

const MINUTES_UNITL_AUTO_LOGOUT = 40 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })
};

 @Injectable({
   providedIn: 'root'
})

export class AdminConsoleService implements HttpInterceptor{

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    emailData = {};
    otpData = {};
  
    isLoggedIn = false;

    private baseApiUrl = environment.apiUrl+"/rebate_data/"


    private check_excelFile_url = this.baseApiUrl+"checkMonthYear";
    private upload_excelFile_url = this.baseApiUrl+"uploadExcelFile";
    private add_rebateData_url = this.baseApiUrl+"getRebateData";

    private get_rebateData_url = this.baseApiUrl+"displayRefundData";
    private upload_refund_url = this.baseApiUrl+"uploadRefund";
    private get_chart_url = this.baseApiUrl+"getChartData";

    private get_otpList_url = this.baseApiUrl+"getOtpList";
    private get_customerInfo_url =this.baseApiUrl+"getCustomerInfo";

    private get_search_url = this.baseApiUrl+"getCustomerInfo";
    private login_url = environment.apiUrl+"/customerLogin";

    constructor(private http: HttpClient,private injector: Injector, private router: Router) {

      this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());

     }


    public get_CheckMonthYear(){
    
        return this.http.get(this.check_excelFile_url);
      }
      public post_addRebateData(filePath:String,month:number){
    
        return this.http.post(this.add_rebateData_url+"/"+month,filePath)
     }
     public post_uploadExcelFile(formData:FormData):Observable<any>{
    
        return this.http.post<any>(this.upload_excelFile_url,formData);
      } 

    public get_RefundData(month:number,year:number):Observable<any>{
        const httpOptions = {
            params: { month, year}
        };
        return this.http.get<any>(this.get_rebateData_url+'/'+month+'/'+year);
      }

      public uploadRefund(month:number,year:number):Observable<any>{
        return this.http.get<any>(this.upload_refund_url+'/'+month+'/'+year);
      }
    
    public getGraphData():Observable<any>{
        return this.http.get<any>(this.get_chart_url);
      }

    //   getToken(){
    //     return localStorage.getItem('token')
    //   }

    public getCustomerDetails(custmersId:any):Observable<any>{
       
        return this.http.get<any>(this.baseApiUrl+"getCustomerDetails/"+custmersId);
      }
    
      
      public getPolicyDetails(custmersId:any):Observable<any>{
        return this.http.get<any>(this.baseApiUrl+"getPolicyDetails/"+custmersId);
      }
    
      public getRefundEachData(customerId: number,month:number,year:number):Observable<any>{
        return this.http.get<any>(this.baseApiUrl+"displayEachRefundData/"+customerId+"/"+month+"/"+year);
      }
    
      public latestOtp(pgOtp:any):Observable<any>{
        return this.http.post<any>(this.get_otpList_url,pgOtp);
      }
    
      public customerInfo(paginationRequest:any,firstName:any,lastName:any):Observable<any>{
        const httpOptions = {
          paginationRequest,
          firstName,
          lastName
      };
        return this.http.post<any>(this.get_customerInfo_url,httpOptions);
      }

      public searchInfo(paginationRequest:any,firstName:any,lastName:any):Observable<any>{
          const httpOptions = {
             paginationRequest,
             firstName,
             lastName
         };
        return this.http.post<any>(this.get_search_url,httpOptions);
      }
      // "paginationRequest" :
      //   {
      //       "pageNo": 0, "pageSize": 10
      //   },
      //   "firstName": "prajwal"

      //authentication
      public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  //sendOTP(params:any) : Observable<any>
  send_otp(emailData: {})
  {

     return this.http.post<any>(`${this.login_url}/sendOTP`,emailData, {responseType: 'json'})
    .pipe(map(user => {
      return user;
    }));
  }

  enter_otp(otpData : {}){

   // let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });

    return this.http.post<any>(`${this.login_url}/login`,otpData, {responseType: 'json'})
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

  intercept(req: any, next: any){
    let authService = this.injector.get(AdminConsoleService)
  
    
    let tokenizedReq = req.clone({
      setHeaders: {
        // Authorization : `${authService.getToken()}`,
        'x-auth-token' :  `${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }



  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY)!);
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

 

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout)  {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }
}