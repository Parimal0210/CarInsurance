import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { OtpComponent } from './otp/otp.component';


const routes: Routes = [
  {path: '',redirectTo: '/login-otp',pathMatch:'full'},
  {path: 'customer-dashboard', component: CustomerDashboardComponent}, //2nd
  {path: 'main-dashboard', component: MainDashboardComponent}, //1st
  {path: 'info-cards', component: InfoCardsComponent }, //3rd

  {path: 'login-otp', component: LoginOtpComponent},
  {path: 'otp', component: OtpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [];
