import { Pipe, PipeTransform } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { parse } from 'url';

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
      if (value.indexOf('+') >= 0) {
        value = String(Number(value));
      } else if (value.indexOf('-') >= 0) {
        let precision;
        if (value[1] === '.') {
          precision = value.indexOf('e') - value.indexOf('.') - 1 + Number(value.substr(value.indexOf('-') + 1, value.length - 1));
        } else {
          precision = Number(value.substr(value.indexOf('-') + 1, value.length - 1));
        }
        if (precision > 8) {
          precision = 8;
        }
        value = String(Number(value).toFixed(precision));
      }
    }
    if (value.indexOf('-') >= 0) {
      if (window.location.href.indexOf('en') >= 0) {
        return 'Unlimited';
      } else {
        return '无限';
      }
    } else if (value.indexOf('.') >= 0) {
      let integer: any, decimal: any;
      integer = this.typeInteger(value.substr(0, value.indexOf('.')));
      decimal = this.typeDecimal(value.substr(value.indexOf('.'), value.length));
      integer = integer.concat(decimal);
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
  public typeDecimal(decimal) {
    let flag;
    flag = 0;
    for (let i = 1; i < decimal.length; i++) {
      if (decimal[i] !== '0') {
        flag = 1;
      }
    }
    if (flag) {
      return decimal;
    } else {
      return '';
    }
  }
}
