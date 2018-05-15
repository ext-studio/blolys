import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transType'
})
export class TransTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || typeof value !== 'string') {
      return value;
    }
    return value.slice(0, -11);
  }

}
