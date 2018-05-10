import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTime'
})
export class UnixTimePipe implements PipeTransform {
  transform(value: any): any {
    if (!value || typeof value !== 'number') {
      return value;
    }
    value = (new Date().getTime() - value * 1000) / 1000;
    const day = Math.floor(value / (24 * 3600));
    value -= day * 24 * 3600;
    const hour = Math.floor(value / 3600);
    value -= hour * 3600;
    const min = Math.floor(value / 60);
    value -= min * 60;
    const sec = Math.floor(value);
    if (day > 0 ) {
      return day + ' day ago';
    } else if (hour > 0) {
      return hour + ' hour ago';
    } else if (min > 0) {
      return min + ' minutes ago';
    } else if (sec > 0) {
      return sec + ' seconds ago';
    }
  }
}
