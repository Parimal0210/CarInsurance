import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { CustPolicySavingCardsComponent } from '../cust-policy-saving-cards/cust-policy-saving-cards.component';
import { RouterModule, Routes } from '@angular/router';
import { InfoCardsComponent } from '../info-cards/info-cards.component';

const routes: Routes = [{path: 'info-cards', component: InfoCardsComponent }]
@NgModule({
  declarations: [NavigationBarComponent
    //CustPolicySavingCardsComponent
  ],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
 exports: [NavigationBarComponent
  //CustPolicySavingCardsComponent
],
 schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
