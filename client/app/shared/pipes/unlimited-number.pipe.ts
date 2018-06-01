import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unlimitedNumber'
})
export class UnlimitedNumberPipe implements PipeTransform {

  transform(value: String, args?: String): String {
    if (value === undefined) {
      return;
    }
    value = String(value);
    if (value.indexOf('-') >= 0) {
      if (window.location.href.indexOf('en') >= 0) {
        return 'Unlimited';
      } else {
        return '无限';
      }
    } else if (value.indexOf('.') >= 0) {
      let integer: any = value.substr(0, value.indexOf('.') - 1);
      let target: any = '';
      for (let j = integer.length - 1; j >= 0; j--) {
        target = target.concat(integer[j]);
      }
      integer = target;
      target = '';
      let flag = 0;
      for (let i = 0; i < integer.length; i++) {
        if (flag !== 0 && flag % 3 === 0) {
          target = target.concat(',');
        }
        target = target.concat(integer[i]);
        ++flag;
      }
      integer = '';
      for (let i = 0, j = target.length - 1; j >= 0; i++, j--) {
        integer = integer.concat(target[j]);
      }
      target = integer.concat(value.substr(value.indexOf('.'), value.length));
      return target;
    } else {
      let integer: any = value;
      let target: any = '';
      for (let j = integer.length - 1; j >= 0; j--) {
        target = target.concat(integer[j]);
      }
      integer = target;
      target = '';
      let flag = 0;
      for (let i = 0; i < integer.length; i++) {
        if (flag !== 0 && flag % 3 === 0) {
          target = target.concat(',');
        }
        target = target.concat(integer[i]);
        ++flag;
      }
      integer = '';
      for (let i = 0, j = target.length - 1; j >= 0; i++, j--) {
        integer = integer.concat(target[j]);
      }
      return integer;
    }
  }

}
