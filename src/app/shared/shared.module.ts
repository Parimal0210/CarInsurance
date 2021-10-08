import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { InfoCardsComponent } from '../info-cards/info-cards.component';
import { CardsComponent } from '../cards/cards.component';

const routes: Routes = [
  {path: 'info-cards', component: InfoCardsComponent },
  // {path: 'cards', component: CardsComponent}
]
@NgModule({
  declarations: [
    NavigationBarComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
 exports: [
   NavigationBarComponent,
   CardsComponent
],
 schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }