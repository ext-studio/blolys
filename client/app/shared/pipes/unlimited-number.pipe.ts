import { Pipe, PipeTransform } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';

@Pipe({
  name: 'unlimitedNumber'
})
export class UnlimitedNumberPipe implements PipeTransform {

  transform(value: String, args?: String): String {
    if (value === undefined) {
      return;
    }
    value = String(value);
    if (value.indexOf('e') >= 0) {
      let target: any = '';
      if (value[2] === '-') {
        target = target.concat('0.');
        for (let i = 1; i < Number(value.substr(value.indexOf('-') + 1, value.length)); i++) {
          target = target.concat('0');
        }
        target = target.concat(value[0]);
        return target;
      } else if (value[2] === '+') {
        target = value[0];
        for (let i = 1; i < Number(value.substr(value.indexOf('+') + 1, value.length)); i++) {
          target = target.concat('0');
        }
        return this.typeInteger(target);
      }
    } else if (value.indexOf('-') >= 0) {
      if (window.location.href.indexOf('en') >= 0) {
        return 'Unlimited';
      } else {
        return '无限';
      }
    } else if (value.indexOf('.') >= 0) {
      let integer = this.typeInteger(value.substr(0, value.indexOf('.')));
      integer = integer.concat(value.substr(value.indexOf('.'), value.length));
      return integer;
    } else {
      return this.typeInteger(value);
    }
  }
  public typeInteger (integer) {
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
