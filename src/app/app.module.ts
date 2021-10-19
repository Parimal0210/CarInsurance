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
import { SearchFilterPipe } from './search-filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { AdminConsoleService } from './services/admin_console.service';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { CountdownModule  } from 'ngx-countdown';



@NgModule({
  declarations: [
    AppComponent,
    InfoCardsComponent,
    routingComponents,
    MainDashboardComponent,
    CustomerDashboardComponent,
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
    CountdownModule,
    SharedModule,
    NgxPaginationModule,
    GoogleChartsModule,
    PaginationModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AdminConsoleService,
    DatePipe,
    PaginationConfig,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AdminConsoleService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
