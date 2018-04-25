import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comma'
})
export class CommaPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value !== 'number') {
      return value;
    }
    let strValue = value.toString();
    let pieceValue = strValue.split('.');
    let rs = '';
    while (pieceValue[0].length) {
      rs = pieceValue[0].slice(-3) + rs;
      pieceValue[0] = pieceValue[0].slice(0, -3);
      if (pieceValue[0].length) {
        rs = ',' + rs;
      }
    }
    return pieceValue[1] ? rs + '.' + pieceValue[1] : rs;
  }
}