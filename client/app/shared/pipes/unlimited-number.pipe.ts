import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unlimitedNumber'
})
export class UnlimitedNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value[0] === '-') {
      if (window.location.href.indexOf('cn') >= 0) {
        return '无限';
      } else {
        return 'Unlimited';
      }
    }
    return value;
  }

}
