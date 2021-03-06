import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { SharedModule } from './shared/shared.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OtpComponent } from './otp/otp.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { AdminConsoleService } from './services/admin_console.service';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { CountdownModule  } from 'ngx-countdown';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { ReportComponent } from './report/report.component';
import { ExcelService } from './services/excel.service';



const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    InfoCardsComponent,
    routingComponents,
    MainDashboardComponent,
    CustomerDashboardComponent,
    OtpComponent,
    LoginOtpComponent,
    ReportComponent,
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
    SharedModule,
    NgxPaginationModule,
    GoogleChartsModule,
    PaginationModule,
    CountdownModule,
    NgxMaskModule.forRoot(maskConfig),
    BsDropdownModule,
    NgbModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AdminConsoleService,
    DatePipe,
    PaginationConfig,
    BsDropdownConfig,
    ExcelService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AdminConsoleService,
    multi: true
  },
  {
    provide: LocationStrategy, useClass: HashLocationStrategy
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
