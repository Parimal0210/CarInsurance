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
import { CustPolicySavingCardsComponent } from './cust-policy-saving-cards/cust-policy-saving-cards.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OtpComponent } from './otp/otp.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { AuthenticationService } from './services/authentication.service';
import { SearchFilterPipe } from './search-filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { AdminConsoleService } from './services/admin_console.service';




@NgModule({
  declarations: [
    AppComponent,
    InfoCardsComponent,
    routingComponents,
    MainDashboardComponent,
    CustomerDashboardComponent,
    CustPolicySavingCardsComponent,
    OtpComponent,
    LoginOtpComponent,
    SearchFilterPipe
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

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AuthenticationService,
    DatePipe,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AdminConsoleService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
