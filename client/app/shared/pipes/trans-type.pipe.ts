import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transType'
})
export class TransTypePipe implements PipeTransform {

  transform(value: any): any {
    if (!value || typeof value !== 'string') {
      return value;
    }
    if (value.length > 11) {
      return value.slice(0, -11);
    } else {
      return 'Any';
    }
  }

}
