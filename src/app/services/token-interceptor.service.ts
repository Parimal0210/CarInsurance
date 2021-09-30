import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { CustomerAndOtpService } from './customer-and-otp.service';
import { isFirstDayOfWeek } from 'ngx-bootstrap/chronos';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: any, next: any){
    let authService = this.injector.get(CustomerAndOtpService)
  
    
    let tokenizedReq = req.clone({
      setHeaders: {
        // Authorization : `${authService.getToken()}`,
        'x-auth-token' :  `${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
