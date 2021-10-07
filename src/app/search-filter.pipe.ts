import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from './models/customer';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(customers: Customer[], searchValue: string): Customer[] {

    if(!customers || !searchValue){
      return customers;
    } 
    return customers.filter(customer =>
      customer.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      
  }

}
