import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { SharedModule } from './shared/shared.module';
import { CustPolicySavingCardsComponent } from './cust-policy-saving-cards/cust-policy-saving-cards.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadCheckExcelService } from './services/upload-check-excel.service';
import { OtpComponent } from './otp/otp.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    InfoCardsComponent,
    routingComponents,
    MainDashboardComponent,
    CustomerDashboardComponent,
    CustPolicySavingCardsComponent,
    OtpComponent,
    LoginOtpComponent
   // NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
   ReactiveFormsModule,
   HttpClientModule,
    BrowserAnimationsModule,
     BsDatepickerModule.forRoot(),
     SharedModule

  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
