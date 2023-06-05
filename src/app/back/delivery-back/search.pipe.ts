import { Pipe, PipeTransform } from '@angular/core';
import { Delivery } from 'src/app/core/models/delivery.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(deliverys: Delivery[], searchText: string): Delivery[] {
    if (!deliverys || !searchText) {
      return deliverys;
    }
    const lowerSearchText = searchText.toLowerCase();
    return deliverys.filter(delivery =>
      Object.values(delivery).some(value => 
        value && value.toString().toLowerCase().includes(lowerSearchText)
      )
    );
  }

}
