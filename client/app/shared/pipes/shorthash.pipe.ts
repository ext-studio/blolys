import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortHash'
})
export class ShortHashPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value || typeof value !== 'string') {
      return value;
    }
    return value.slice(0, 6) + '......' + value.slice(-6);
  }
}
